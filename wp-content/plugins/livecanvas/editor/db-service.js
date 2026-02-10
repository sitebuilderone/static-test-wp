/**
 * IndexedDBService
 * A helper class to interact with IndexedDB.
 */
class DBService {
    /**
     * Creates an instance of IndexedDBService.
     * @param {string} dbName - The name of the database.
     * @param {string} storeName - The name of the object store.
     * @param {number} [version=1] - The version of the database.
     */
    constructor(dbName, storeName, version = 1) {
        this.dbName = dbName;
        this.storeName = storeName;
        this.version = version;
        this.db = null;
        this.subscribers = [];
        try {
            this.openDB();
        } catch (error) {
            console.error('Error: ' + error);
        }
    }

    /**
     * Opens a connection to the IndexedDB database.
     * @returns {Promise<IDBDatabase>} - A promise that resolves to the database instance.
     */
    openDB() {
        return new Promise((resolve, reject) => {
            if (this.db) {
                return resolve(this.db);
            }

            const request = indexedDB.open(this.dbName, this.version);

            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains(this.storeName)) {
                    db.createObjectStore(this.storeName, { keyPath: 'id', autoIncrement: true });
                }
            };

            request.onsuccess = (event) => {
                this.db = event.target.result;

                // If the database is already open in another tab, this will trigger in the second tab.
                this.db.onversionchange = () => {
                    alert("This page is already open in another tab. No problem, as long as you know what you're doing, but Local history won't be available in this tab to prevent conflicts.");
                    this.db.close(); // Close the db in the current tab to release it.
                    this.db = null; // Clear reference
                };

                resolve(this.db);
            };

            request.onerror = (event) => {
                reject(`IndexedDB error: ${event.target.errorCode}`);
            };
        });
    }


    /**
     * Subscribe to data changes in the database.
     * @param {Function} callback - The callback function to execute when data changes.
     * @returns {number} - A subscription ID that can be used to unsubscribe.
     */
    subscribe(callback) {
        const subscriptionId = Date.now();
        this.subscribers.push({
            id: subscriptionId,
            callback
        });
        return subscriptionId;
    }

    /**
     * Unsubscribe from data changes.
     * @param {number} subscriptionId - The subscription ID returned from subscribe().
     */
    unsubscribe(subscriptionId) {
        this.subscribers = this.subscribers.filter(sub => sub.id !== subscriptionId);
    }

    /**
     * Notify all subscribers about data changes.
     * @param {string} action - The action that occurred (add, update, delete).
     * @param {Object} data - The data that was changed.
     * @private
     */
    _notifySubscribers(action, data) {
        this.subscribers.forEach(subscriber => {
            try {
                subscriber.callback(action, data);
            } catch (error) {
                console.error('Error in subscriber callback:', error);
            }
        });
    }

    /**
     * Saves data to the object store.
     * @param {Object} data - The data object to save.
     * @returns {Promise<number>} - A promise that resolves to the key of the saved object.
     */
    async saveData(data, differentFromLast) {
        try {
            const db = await this.openDB();
            return new Promise((resolve, reject) => {
                const transaction = db.transaction(this.storeName, 'readwrite');
                const store = transaction.objectStore(this.storeName);
                const request = store.add(data);

                request.onsuccess = (event) => {
                    const key = event.target.result;
                    // Notify subscribers about the new data
                    this._notifySubscribers('add', { ...data, id: key });
                    resolve(key); // The key of the added object.
                };

                request.onerror = () => {
                    reject('Failed to save data.');
                };
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    async checkKeyExists(key) {
        const db = await this.openDB();
        return new Promise((resolve, reject) => {
            const transaction = db.transaction(this.storeName, 'readonly');
            const store = transaction.objectStore(this.storeName);
            const request = store.getKey(key);

            request.onsuccess = (event) => {
                resolve(event.target.result !== undefined);
            };

            request.onerror = () => {
                reject(false);
            };
        });
    }

    /**
     * Retrieves data by key from the object store.
     * @param {number|string} key - The key of the data to retrieve.
     * @returns {Promise<Object>} - A promise that resolves to the retrieved data object.
     */
    async getData(key) {
        try {
            const db = await this.openDB();
            // console.log('inizio recupero per: ', key)

            const exists = await this.checkKeyExists(key);
            // console.log(`Key ${key} exists:`, exists, ' in store name: ', this.storeName);


            return new Promise((resolve, reject) => {
                const transaction = db.transaction(this.storeName, 'readonly');
                const store = transaction.objectStore(this.storeName);
                const request = store.get(key);

                request.onsuccess = (event) => {
                    // console.log('recuperati con successo')
                    // console.log(event)
                    resolve(event.target.result);
                };

                request.onerror = () => {
                    reject('Failed to retrieve data.');
                };
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * Retrieves all data from the object store.
     * @returns {Promise<Array>} - A promise that resolves to an array of all data objects.
     */
    async getAllData() {
        try {
            const db = await this.openDB();
            return new Promise((resolve, reject) => {
                const transaction = db.transaction(this.storeName, 'readonly');
                const store = transaction.objectStore(this.storeName);
                const request = store.getAll();

                request.onsuccess = (event) => {
                    resolve(event.target.result);
                };

                request.onerror = () => {
                    reject('Failed to retrieve all data.');
                };
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * Updates an existing data object in the store.
     * @param {number|string} key - The key of the data to update.
     * @param {Object} updatedData - The updated data object.
     * @returns {Promise<void>} - A promise that resolves when the update is successful.
     */
    async updateData(key, updatedData) {
        try {
            const db = await this.openDB();
            return new Promise((resolve, reject) => {
                const transaction = db.transaction(this.storeName, 'readwrite');
                const store = transaction.objectStore(this.storeName);
                const dataToUpdate = { ...updatedData, id: key };
                const request = store.put(dataToUpdate);

                request.onsuccess = () => {
                    // Notify subscribers about the updated data
                    this._notifySubscribers('update', dataToUpdate);
                    resolve();
                };

                request.onerror = () => {
                    reject('Failed to update data.');
                };
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * Deletes data by key from the object store.
     * @param {number|string} key - The key of the data to delete.
     * @returns {Promise<void>} - A promise that resolves when the deletion is successful.
     */
    async deleteData(key) {
        try {
            const db = await this.openDB();
            // First get the data to be deleted so we can notify subscribers
            const dataToDelete = await this.getData(key);

            return new Promise((resolve, reject) => {
                const transaction = db.transaction(this.storeName, 'readwrite');
                const store = transaction.objectStore(this.storeName);
                const request = store.delete(key);

                request.onsuccess = () => {
                    // Notify subscribers about the deleted data
                    if (dataToDelete) {
                        this._notifySubscribers('delete', dataToDelete);
                    }
                    resolve();
                };

                request.onerror = () => {
                    reject('Failed to delete data.');
                };
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * Retrieves the last record from the object store.
     * @returns {Promise<Object|null>} - A promise that resolves to the last data object or null if none exist.
     */
    async getLastRecord() {
        try {
            const db = await this.openDB();
            return new Promise((resolve, reject) => {
                const transaction = db.transaction(this.storeName, 'readonly');
                const store = transaction.objectStore(this.storeName);
                const request = store.openCursor(null, 'prev'); // Open cursor in reverse order

                request.onsuccess = (event) => {
                    const cursor = event.target.result;
                    if (cursor) {
                        resolve(cursor.value);
                    } else {
                        resolve(null); // No records found
                    }
                };

                request.onerror = () => {
                    reject('Failed to retrieve the last record.');
                };
            });
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * Closes the database connection.
     */
    closeDB() {
        if (this.db) {
            this.db.close();
            this.db = null;
        }
    }
}



// ============================
// CLASS USAGE EXAMPLE
// ============================

// (async () => {
//     // Initialize the IndexedDBService
//     const dbService = new DBService('MyDatabase', 'MyStore', 1);

//     try {
//         // Save data
//         const newData = { name: 'John Doe', email: 'john.doe@example.com' };
//         const id = await dbService.saveData(newData);
//         console.log(`Data saved with id: ${id}`);

//         // Retrieve data by id
//         const retrievedData = await dbService.getData(id);
//         console.log('Retrieved Data:', retrievedData);

//         // Update data
//         const updatedData = { name: 'John Doe', email: 'john.updated@example.com' };
//         await dbService.updateData(id, updatedData);
//         console.log('Data updated successfully.');

//         // Retrieve all data
//         const allData = await dbService.getAllData();
//         console.log('All Data:', allData);

//         // Delete data
//         await dbService.deleteData(id);
//         console.log('Data deleted successfully.');
//     } catch (error) {
//         console.error(error);
//     } finally {
//         // Close the database connection when done
//         dbService.closeDB();
//     }
// })();


//INITIALIZE DB SERVICE
LiveCanvasHistoryDBService = new DBService('LiveCanvasDB_' + lc_editor_site_id + '_' + lc_editor_current_post_id, 'history_steps_store', Date.now());
LiveCanvasAIHistoryDBService = new DBService('LiveCanvasAIPromptsDB_' + lc_editor_site_id + '_', 'history_ai_store' , Date.now());
