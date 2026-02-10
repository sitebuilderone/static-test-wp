// TREE VIEW: CORE FUNCTIONS /////////////////

function createTreeHTML(node) {
    try {
        // Base case: if node is not an element node, return an empty string
        if (!node || node.nodeType !== Node.ELEMENT_NODE) {
            console.log("Non-element node or null node encountered");
            return '';
        }

        // Create the current node's HTML representation
        const tag = node.tagName.toLowerCase();
        const id = node.id ? `#${node.id}` : '';
        const classList = Array.from(node.classList || []);
        const classes = classList.slice(0, 2).map(cls => `.${cls}`).join(' ');
        const fullClasses = classList.map(cls => `.${cls}`).join(' ');

        // Generate safe selector for the node
        const nodeSelector = CSSelectorForDoc(node);
        console.log(`Creating tree HTML for ${tag}${id} with selector: ${nodeSelector}`);

        // Determine the item type and get the corresponding icon HTML
        const itemType = getLayoutElementType(nodeSelector); // Assumes this function returns a string identifier for the item
        const iconHtml = itemType ? getCustomIcon('panel-title-' + itemType) : '';

        // Generate the HTML for children recursively, but only for element nodes
        let childrenHTML = '';
        try {
            childrenHTML = Array.from(node.childNodes)
                .filter(child => child.nodeType === Node.ELEMENT_NODE)
                .map(child => createTreeHTML(child))
                .join('');
        } catch (error) {
            console.error("Error generating children HTML:", error);
            childrenHTML = '';
        }

        // Combine the current node with its children
        return `
        <li class="tree-view-item" data-selector="${nodeSelector}" title="${fullClasses}" draggable="true">
            <div class="tree-view-item-content-wrapper">
                <span class="tree-item-icon">${iconHtml}</span>
                <span class="tree-item-tagname">${tag}</span>
                ${id ? `<span class="tree-item-id">${id}</span>` : ''}
                <span class="tree-item-classes" >${classes || ''}</span>
            </div>
            ${childrenHTML ? `<ul class="tree-children" hidden>${childrenHTML}</ul>` : ''}
        </li>`;
    } catch (error) {
        console.error("Error in createTreeHTML:", error);
        return '';
    }
}

function renderTreeHTMLStructure(selector) {
    console.log('Rendering tree structure for:', selector);
    try {
        const rootNode = doc.querySelector(selector);
        if (!rootNode) {
            console.error('Root node not found for selector:', selector);
            return '<div class="tree-error">Root element not found</div>'; 
        }
        
        // Create HTML for main container first
        const tag = rootNode.tagName.toLowerCase();
        const id = rootNode.id ? `#${rootNode.id}` : '';
        const classList = Array.from(rootNode.classList || []);
        const classes = classList.slice(0, 2).map(cls => `.${cls}`).join(' ');
        const fullClasses = classList.map(cls => `.${cls}`).join(' ');
        const rootSelector = CSSelectorForDoc(rootNode);
        
        console.log('Creating tree structure with root selector:', rootSelector);
        
        // Get icon for main element
        const itemType = getLayoutElementType(rootSelector);
        const iconHtml = itemType ? getCustomIcon('panel-title-' + itemType) : '';
        
        // Generate children HTML
        let childrenHTML = '';
        try {
            const childNodes = Array.from(rootNode.childNodes)
                .filter(child => child.nodeType === Node.ELEMENT_NODE);
            
            console.log(`Found ${childNodes.length} child nodes in root element`);
            
            childrenHTML = childNodes
                .map(child => createTreeHTML(child))
                .join('');
        } catch (error) {
            console.error('Error generating children HTML:', error);
            childrenHTML = '<li class="tree-error">Error generating children</li>';
        }
        
        // Create tree structure with main container as non-draggable
        return `
        <ul class="tree-view-container">
            <li class="tree-view-item root-item" data-selector="${rootSelector}" title="${fullClasses}" draggable="false">
                <div class="tree-view-item-content-wrapper root-wrapper">
                    <span class="tree-item-icon">${iconHtml}</span>
                    <span class="tree-item-tagname">${tag}</span>
                    ${id ? `<span class="tree-item-id">${id}</span>` : ''}
                    <span class="tree-item-classes">${classes || ''}</span>
                </div>
                ${childrenHTML ? `<ul class="tree-children">${childrenHTML}</ul>` : ''}
            </li>
        </ul>`;
    } catch (error) {
        console.error('Error in renderTreeHTMLStructure:', error);
        return '<div class="tree-error">Error rendering tree</div>';
    }
}

function redrawTreePart(selector) {
  console.log("Redrawing tree part for selector:", selector);
  try {
    // Normalize selector
    if (selector.toUpperCase() === 'MAIN#LC-MAIN') {
      selector = 'main#lc-main';
    }
    
    const specificNode = doc.querySelector(selector);
    if (!specificNode) {
      console.error("Specific node not found:", selector);
      
      // If we can't find the specified node, let's refresh the entire tree
      console.log("Refreshing entire tree instead");
      document.getElementById('tree-body').innerHTML = renderTreeHTMLStructure('main#lc-main');
      return;
    }

    // A map to store the visibility state
    const visibilityStates = new Map();
    const treeItems = document.querySelectorAll("#tree-body .tree-view-item");
    treeItems.forEach((item) => {
      const itemSelector = item.getAttribute("data-selector");
      const isHidden = item.querySelector(".tree-children")?.hidden;
      visibilityStates.set(itemSelector, isHidden);
    });

    // Generate the new HTML for the subtree
    const newSubtreeHTML = createTreeHTML(specificNode);
    console.log("Generated new subtree HTML, length:", newSubtreeHTML.length);

    // Replace the old subtree with the new one in the DOM
    try {
      const safeSelector = CSSelectorForDoc(specificNode);
      console.log("Looking for tree item with selector:", safeSelector);
      const existingItem = document.querySelector(
        `#tree-body [data-selector="${safeSelector}"]`,
      );
      
      if (existingItem) {
        console.log("Found existing tree item, replacing...");
        const parentContainer = existingItem.parentNode;
        existingItem.outerHTML = newSubtreeHTML;

        // Search in the map to know if that node was hidden or not
        const newTreeItems = parentContainer.querySelectorAll(".tree-view-item");
        newTreeItems.forEach((newItem) => {
          const newItemSelector = newItem.getAttribute("data-selector");
          const wasHidden = visibilityStates.get(newItemSelector);
          const childrenContainer = newItem.querySelector(".tree-children");
          if (childrenContainer && wasHidden !== undefined) {
            childrenContainer.hidden = wasHidden;
          }
        });
        console.log("Tree part redraw complete");
      } else {
        console.error(
          "Existing tree item not found for selector:",
          safeSelector
        );
        // Try to refresh the entire tree if we can't find the specific item
        console.log("Refreshing entire tree instead");
        document.getElementById('tree-body').innerHTML = renderTreeHTMLStructure('main#lc-main');
      }
    } catch (error) {
      console.error("Error updating tree item:", error);
      // Fallback to refreshing the entire tree
      console.log("Error occurred, refreshing entire tree");
      document.getElementById('tree-body').innerHTML = renderTreeHTMLStructure('main#lc-main');
    }
  } catch (error) {
    console.error("Error in redrawTreePart:", error);
    // Final fallback - refresh the entire tree
    try {
      document.getElementById('tree-body').innerHTML = renderTreeHTMLStructure('main#lc-main');
    } catch (innerError) {
      console.error("Failed to refresh tree:", innerError);
    }
  }
}

// Helper function to safely get a selector for an element
function getSafeSelector(element) {
    try {
        if (!element || element.nodeType !== Node.ELEMENT_NODE) {
            console.error("Cannot get selector for non-element node");
            return null;
        }
        return CSSelectorForDoc(element);
    } catch (error) {
        console.error("Error generating selector:", error);
        return null;
    }
}

// Function to safely update the preview after element movement
function safelyUpdatePreview(selector) {
    try {
        console.log("Safely updating preview for:", selector);
        if (!selector) {
            console.error("Invalid selector for preview update");
            return;
        }
        
        // First try to update just the affected part
        updatePreviewSectorial(selector);
        
        // Also update the tree view
        setTimeout(() => {
            try {
                redrawTreePart(selector);
            } catch (error) {
                console.error("Error redrawing tree part:", error);
            }
        }, 50);
    } catch (error) {
        console.error("Error updating preview:", error);
        // Fallback to full update if sectorial update fails
        try {
            updatePreview();
        } catch (fallbackError) {
            console.error("Full preview update also failed:", fallbackError);
        }
    }
}

// Update the moveElementToTarget function to use the safer methods
function moveElementToTarget(sourceSelector, targetSelector, position = 'inside') {
    console.log('Move Element - Source:', sourceSelector);
    console.log('Move Element - Target:', targetSelector);
    console.log('Move Element - Position:', position);
    
    // Normalize selectors to ensure consistent format
    try {
        // If selectors use simplified format, convert them
        if (sourceSelector.toUpperCase() === 'MAIN#LC-MAIN') {
            sourceSelector = 'main#lc-main';
        }
        if (targetSelector.toUpperCase() === 'MAIN#LC-MAIN') {
            targetSelector = 'main#lc-main';
        }
        
        // Validate that both selectors exist
        const sourceElement = doc.querySelector(sourceSelector);
        const targetElement = doc.querySelector(targetSelector);
        
        console.log('Source element found:', !!sourceElement);
        console.log('Target element found:', !!targetElement);
        
        if (!sourceElement) {
            console.error("Source element not found:", sourceSelector);
            return false;
        }
        
        if (!targetElement) {
            console.error("Target element not found:", targetSelector);
            return false;
        }
        
        // Cannot move an element to itself with "inside" position
        if (sourceSelector === targetSelector) {
            console.log("Cannot move an element to itself");
            return false;
        }
        
        // Get the parent node to update preview later
        const sourceParentNode = sourceElement.parentNode;
        const targetParentNode = targetElement.parentNode;
        
        // Get safe selectors for parents
        const sourceParentSelector = getSafeSelector(sourceParentNode);
        const targetParentSelector = getSafeSelector(targetParentNode);
        
        console.log('Source parent:', sourceParentSelector);
        console.log('Target parent:', targetParentSelector);
        
        // Make a copy of the source element before removing it
        const sourceHTML = sourceElement.outerHTML;
        console.log('Source HTML length:', sourceHTML.length);
        
        // Special case for main element - don't allow modifying it
        if (sourceSelector === 'main#lc-main' || targetSelector === 'main#lc-main') {
            console.error("Cannot modify the main element");
            swal("Cannot move the main element");
            return false;
        }
        
        // Only apply the position if we're not dealing with the main element
        let success = false;
        
        try {
            // Determine where to place the element based on position parameter
            switch (position) {
                case 'before':
                    // Insert before target
                    console.log('Inserting before target');
                    targetElement.insertAdjacentHTML('beforebegin', sourceHTML);
                    success = true;
                    break;
                case 'after':
                    // Insert after target
                    console.log('Inserting after target');
                    targetElement.insertAdjacentHTML('afterend', sourceHTML);
                    success = true;
                    break;
                case 'inside':
                    // Only check if target is a descendant of source when inserting inside
                    if (sourceElement.contains(targetElement)) {
                        console.error("Cannot move an element inside one of its descendants");
                        swal("Cannot move an element inside one of its descendants");
                        return false;
                    }
                    // Insert as last child of target
                    console.log('Inserting inside target');
                    targetElement.insertAdjacentHTML('beforeend', sourceHTML);
                    success = true;
                    break;
                default:
                    // Default to inserting as last child
                    console.log('Default insert operation');
                    targetElement.insertAdjacentHTML('beforeend', sourceHTML);
                    success = true;
                    break;
            }
            
            if (success) {
                // Only remove the original element if insertion was successful
                sourceElement.remove();
                console.log('Source element removed successfully');
                
                // Update parent element of inserted node
                const updateSelector = position === 'inside' ? targetSelector : targetParentSelector;
                console.log('Updating preview for:', updateSelector);
                safelyUpdatePreview(updateSelector);
                
                // If source and target parents are different, update the source parent view too
                if (sourceParentNode !== targetParentNode && sourceParentSelector) {
                    console.log('Updating preview for source parent:', sourceParentSelector);
                    setTimeout(() => {
                        safelyUpdatePreview(sourceParentSelector);
                    }, 100);
                }
            }
            
            return success;
        } catch (error) {
            console.error('Error during element movement:', error);
            return false;
        }
    } catch (error) {
        console.error('Error in moveElementToTarget:', error);
        return false;
    }
}

// Helper to find the correct tree item when targeting nested elements
function findTreeItemFromTarget(target) {
  // Find the closest tree-view-item parent
  let treeItem = target.closest('.tree-view-item');
  if (!treeItem) {
    console.error('No tree-view-item found from target', target);
    return null;
  }
  return treeItem;
}

// Setup drag and drop functionality for tree items
function setupTreeDragAndDrop() {
  let draggedItem = null;
  let dropPosition = 'inside'; // Default drop position (inside, before, after)
  
  console.log('Setting up tree drag and drop...');
  
  // Properly delegate events to handle dynamically created elements
  const treeBody = document.getElementById('tree-body');
  if (!treeBody) {
    console.error('Tree body element not found');
    return;
  }
  
  // Add global event handlers for performance and to catch dynamically added elements
  
  // Drag start - delegate to the tree body
  treeBody.addEventListener('dragstart', function(e) {
    // Only process if we're starting a drag on a tree item
    const treeItem = findTreeItemFromTarget(e.target);
    if (!treeItem) return;
    
    // Skip main element
    const selector = treeItem.getAttribute('data-selector');
    if (!selector || selector === 'main#lc-main' || selector === 'MAIN#lc-main') {
      console.log('Preventing drag on main element or item without selector');
      e.preventDefault();
      return false;
    }
    
    console.log('Drag started on specific element:', selector);
    draggedItem = treeItem;
    e.dataTransfer.setData('text/plain', selector);
    treeItem.classList.add('dragging');
    
    // Delay adding the visual effect
    setTimeout(() => {
      treeItem.style.opacity = '0.4';
    }, 0);
  }, false);
  
  // Drag end - delegate to the tree body
  treeBody.addEventListener('dragend', function(e) {
    // Only process if ending a drag on a tree item
    const treeItem = findTreeItemFromTarget(e.target);
    if (!treeItem) return;
    
    console.log('Drag ended on:', treeItem.getAttribute('data-selector'));
    treeItem.classList.remove('dragging');
    treeItem.style.opacity = '1';
    document.querySelectorAll('.drop-target-before, .drop-target-after, .drop-target-inside').forEach(el => {
      el.classList.remove('drop-target-before', 'drop-target-after', 'drop-target-inside');
    });
  }, false);
  
  // Drag over - delegate to the tree body
  treeBody.addEventListener('dragover', function(e) {
    e.preventDefault();
    
    // Find the actual tree item being dragged over
    const treeItem = findTreeItemFromTarget(e.target);
    if (!treeItem || !draggedItem || draggedItem === treeItem) return;
    
    // Determine drop position based on mouse Y position
    const rect = treeItem.getBoundingClientRect();
    const mouseY = e.clientY;
    const topThreshold = rect.top + rect.height * 0.25;
    const bottomThreshold = rect.bottom - rect.height * 0.25;
    
    // Remove indicators from all elements
    document.querySelectorAll('.drop-target-before, .drop-target-after, .drop-target-inside').forEach(el => {
      el.classList.remove('drop-target-before', 'drop-target-after', 'drop-target-inside');
    });
    
    if (mouseY < topThreshold) {
      // Drop before
      treeItem.classList.add('drop-target-before');
      dropPosition = 'before';
    } else if (mouseY > bottomThreshold) {
      // Drop after
      treeItem.classList.add('drop-target-after');
      dropPosition = 'after';
    } else {
      // Drop inside
      treeItem.classList.add('drop-target-inside');
      dropPosition = 'inside';
    }
  }, false);
  
  // Drag leave - delegate to the tree body
  treeBody.addEventListener('dragleave', function(e) {
    // Find the actual tree item being left
    const treeItem = findTreeItemFromTarget(e.target);
    if (!treeItem) return;
    
    treeItem.classList.remove('drop-target-before', 'drop-target-after', 'drop-target-inside');
  }, false);
  
  // Drop - delegate to the tree body
  treeBody.addEventListener('drop', function(e) {
    e.preventDefault();
    
    console.log('HERE: Drop event started');
    
    // Find the actual tree item being dropped on
    const treeItem = findTreeItemFromTarget(e.target);
    if (!treeItem || !draggedItem || draggedItem === treeItem) {
      console.log('Invalid drop target or source');
      return;
    }
    
    // Get selectors
    const sourceSelector = draggedItem.getAttribute('data-selector');
    const targetSelector = treeItem.getAttribute('data-selector');
    
    if (!sourceSelector || !targetSelector) {
      console.error('Missing selectors for drag/drop operation:', 
                  'Source:', sourceSelector, 'Target:', targetSelector);
      return;
    }
    
    console.log('Dropping element:', sourceSelector);
    console.log('Target element:', targetSelector);
    console.log('Drop position:', dropPosition);
    
    // Save the expanded/collapsed state of all tree nodes before modifying the DOM
    console.log('Saving tree node expansion states');
    const expansionState = {};
    document.querySelectorAll('#tree-body .tree-view-item').forEach(item => {
      const itemSelector = item.getAttribute('data-selector');
      if (itemSelector) {
        const childrenContainer = item.querySelector('.tree-children');
        if (childrenContainer) {
          // Important: We need to directly check the hidden property/attribute
          // false means expanded, true means collapsed
          const isExpanded = childrenContainer.hidden !== true;
          expansionState[itemSelector] = isExpanded;
          console.log(`Node ${itemSelector} saved as ${isExpanded ? 'expanded' : 'collapsed'}`);
        }
      }
    });
    console.log('Saved expansion states for', Object.keys(expansionState).length, 'nodes');
    console.log('Expansion state object:', JSON.stringify(expansionState));
    
    // Move the element
    console.log('HERE: Before moveElementToTarget call');
    const success = moveElementToTarget(sourceSelector, targetSelector, dropPosition);
    console.log('HERE: After moveElementToTarget call. Success:', success);
    
    if (success) {
      // Clear the draggedItem reference
      draggedItem = null;
      
      // Redraw the tree after successful move - using a complete reinitialization approach
      console.log('HERE: Completely reinitializing tree view');
      
      try {
        // First, ensure the DOM reflects the changes
        console.log('HERE: Updating preview to reflect DOM changes');
        updatePreview();
        
        // Wait a bit for the DOM update to complete
        setTimeout(() => {
          try {
            console.log('HERE: Reinitializing tree structure');
            const treeBody = document.getElementById('tree-body');
            
            if (treeBody) {
              // Recreate the tree view completely, similar to the initial creation
              treeBody.innerHTML = renderTreeHTMLStructure('main#lc-main');
              
              // Ensure main element is not draggable
              const mainElement = document.querySelector('#tree-body .tree-view-item[data-selector="main#lc-main"]');
              if (mainElement) {
                console.log('Making main element non-draggable');
                mainElement.setAttribute('draggable', 'false');
              }
              
              // We'll handle tree expansion after restoring the saved states
              
              // Restore the expansion state of all nodes
              console.log('Restoring tree node expansion states');
              let restoredCount = 0;
              let expandedCount = 0;
              let collapsedCount = 0;

              // First, set ALL nodes to collapsed by default (except root)
              document.querySelectorAll('#tree-body .tree-view-item:not(:first-child) .tree-children').forEach(childContainer => {
                childContainer.setAttribute('hidden', '');
              });

              // Now restore only the ones that were explicitly expanded
              document.querySelectorAll('#tree-body .tree-view-item').forEach(item => {
                const itemSelector = item.getAttribute('data-selector');
                if (itemSelector && expansionState[itemSelector] !== undefined) {
                  const childrenContainer = item.querySelector('.tree-children');
                  if (childrenContainer) {
                    const shouldBeExpanded = expansionState[itemSelector] === true;
                    console.log(`Restoring node ${itemSelector} to ${shouldBeExpanded ? 'expanded' : 'collapsed'}`);
                    
                    if (shouldBeExpanded) {
                      childrenContainer.removeAttribute('hidden');
                      expandedCount++;
                    } else {
                      childrenContainer.setAttribute('hidden', '');
                      collapsedCount++;
                    }
                    restoredCount++;
                  }
                }
              });

              // Remove the previous code for expanding the first level
              // And make sure the root level is always expanded at the end
              const treeRootChildren = document.querySelector('#tree-body > .tree-view-container > .tree-view-item > .tree-children');
              if (treeRootChildren) {
                treeRootChildren.removeAttribute('hidden');
                console.log('Ensured root level is expanded');
              }

              console.log(`Restored ${restoredCount} nodes total: ${expandedCount} expanded, ${collapsedCount} collapsed`);
              
              console.log('HERE: Tree view successfully reinitialized');
            } else {
              console.error('HERE: tree-body element not found for reinitialization');
            }
          } catch (innerError) {
            console.error('HERE: Error during tree reinitialization:', innerError);
          }
        }, 500); // Slightly longer timeout to ensure DOM is ready
      } catch (error) {
        console.error('HERE: Error in updating preview:', error);
        
        // Last resort fallback
        try {
          console.log('HERE: Attempting emergency tree rebuild');
          const treeBody = document.getElementById('tree-body');
          if (treeBody) {
            treeBody.innerHTML = renderTreeHTMLStructure('main#lc-main');
          }
        } catch (fallbackError) {
          console.error('HERE: Emergency tree rebuild failed:', fallbackError);
        }
      }
    } else {
      console.error('Failed to move element');
    }
    
    // Clear visual indicators
    console.log('HERE: Clearing visual indicators');
    document.querySelectorAll('.drop-target-before, .drop-target-after, .drop-target-inside').forEach(el => {
      el.classList.remove('drop-target-before', 'drop-target-after', 'drop-target-inside');
    });
    console.log('HERE: Drop event handling completed');
  }, false);
  
  // Ensure main element is not draggable
  const mainElement = document.querySelector('#tree-body .tree-view-item[data-selector="main#lc-main"]');
  if (mainElement) {
    console.log('Making main element non-draggable');
    mainElement.setAttribute('draggable', 'false');
  }
  
  console.log('Tree drag and drop setup complete');
}

//TREE VIEW: HANDLE USER ACTIONS ////////////

//USER CLICKS TREEVIEW ICON IN MAIN MENU BAR 
class TreeViewWindow {
  constructor() {
    if (!TreeViewWindow.instance) {
        this.winBox = null;
        TreeViewWindow.instance = this;
    }
    return TreeViewWindow.instance;
  }

  open() {
    if (this.winBox) {
      return; // Window is already open
    }
    this.winBox = new WinBox({
        id: "tree-window",
        title: "Tree View",
        class: ["no-full", "no-max", "my-theme"],
        html: $("#tree-view-window-content-template").html(),
        background: "#e83e8c",
        border: 4,
        width: 350,
        height: "96%",
        minheight: 55,
        minwidth: 100,
        x: "right",
        top: 45,
        right: 0,
        onclose: () => {
            $("#toggle-tree-view").removeClass("is-active");
            this.winBox = null; 
        }
    });
    
    console.log('Initializing tree view...');
    
    // Render the tree structure
    try {
      document.getElementById('tree-body').innerHTML = renderTreeHTMLStructure('main#lc-main');
      console.log('Tree HTML structure rendered');
      
      // Find and select the first item
      $('#tree-body').find(".tree-view-item-content-wrapper").first().click();
      
      // Ensure main element is not draggable
      const mainElement = document.querySelector('#tree-body .tree-view-item[data-selector="main#lc-main"]');
      if (mainElement) {
        console.log('Making main element non-draggable');
        mainElement.setAttribute('draggable', 'false');
      }
      
      // Initialize drag and drop with a slight delay to ensure DOM is ready
      setTimeout(() => {
        setupTreeDragAndDrop();
      }, 100);
    } catch (error) {
      console.error('Error initializing tree view:', error);
    }
  }

  close() {
    if (this.winBox) {
      this.winBox.close();
      this.winBox = null;
    }
  }
}

//USER CLICKS TREEVIEW ICON IN MAIN MENU BAR 
$("body").on("click", "#toggle-tree-view", function (e) {
    e.preventDefault(); 

    $(this).toggleClass("is-active");
    const treeViewWindow = new TreeViewWindow();

    if ($(this).hasClass("is-active")) {
        
        treeViewWindow.open();

        //open the tree. Opinioned expanding
        $("#tree-expand-all").click();
    } else {
        treeViewWindow.close();
    }

});



//USER HOVERS TREE VIEW ITEM: HIGHLIGHT SAME PART IN PREVIEW
$("body").on("mouseenter", ".tree-view-item-content-wrapper", function (e) {
    
    if ($("#tree-context-menu").is("visible")) return false;

    selector = $(this).parent().attr("data-selector"); 
    previewFrame.contents().find(".lc-highlight-currently-editing").removeClass("lc-highlight-currently-editing"); //for security
    previewFrame.contents().find(selector).addClass("lc-highlight-currently-editing");

    //$("#tree-body").find(".active").removeClass("active");
    //$(this).addClass("active");
});

//USER CLICKS TREE HEAD LINK: EXPAND ALL
$("body").on("click", "#tree-expand-all", function (e) {
    e.preventDefault();
    e.stopPropagation();
    $(".tree-view-item").each(function () { 
        const item = $(this).find(".tree-children")[0];
        if (item) {
            item.hidden = false;
        }
    });
});

//USER CLICKS TREE HEAD LINK: COLLAPSE ALL
$("body").on("click", "#tree-collapse-all", function (e) {
    e.preventDefault();
    e.stopPropagation();
    $(".tree-view-item").each(function () { 
        const item = $(this).find(".tree-children")[0];
        if (item) {
            item.hidden = true;
        }
    });
    // $('#tree-body').find(".tree-view-item").first().click(); //open root

    const treeContainer = document.querySelector('#tree-body .tree-view-container');
    if (treeContainer) {
      const firstTreeItem = treeContainer.querySelector('.tree-view-item');
      if (firstTreeItem) {
        const treeChildren = firstTreeItem.querySelector('.tree-children');
        if (treeChildren) {
          treeChildren.removeAttribute('hidden');
        }
      }
    }

});

//USER CLICKS TREE VIEW ITEM: OPEN COLLAPSIBLE AND SCROLL PREVIEW TO ELEMENT
$("body").on("click", ".tree-view-item-content-wrapper", function (e) {
  e.preventDefault();
  e.stopPropagation();

  // Ensure we use the data-selector from the parent .tree-view-item
  const selector = $(this).closest('.tree-view-item').attr("data-selector");
 
  // Toggle visibility of .tree-children directly within the clicked .tree-view-item
  const item = $(this).closest('.tree-view-item').find('> .tree-children').first();
  //  replace item.toggle(); causing problem adding display: none
  if (item[0].hasAttribute('hidden')) {
      // Remove the 'hidden' attribute if it is set
      item[0].removeAttribute('hidden');
  } else {
      // Add the 'hidden' attribute if it is not set
      item[0].setAttribute('hidden', '');
  }

  // If the tree item is not hidden, scroll the preview frame to the element
  if (!item.is(":hidden")) {
      previewFrame.contents().find("html, body").animate({
          scrollTop: previewFrame.contents().find(selector).offset().top
      }, 100, 'linear');
  }
});

//USER RIGHT-CLICKS A TREE VIEW ITEM: open the context menu
$("body").on("contextmenu", ".tree-view-item", function (e) {
    e.preventDefault();
    e.stopPropagation(); 
    let contextMenu = document.getElementById("tree-context-menu");
    contextMenu.setAttribute("data-selector", $(this).attr("data-selector"));

    //x and y position of mouse or touch
    let mouseX = e.clientX || e.touches[0].clientX;
    let mouseY = e.clientY || e.touches[0].clientY;
    //height and width of menu
    let menuHeight = contextMenu.getBoundingClientRect().height;
    let menuWidth = contextMenu.getBoundingClientRect().width;
    //width and height of screen
    let width = window.innerWidth;
    let height = window.innerHeight;
    //If user clicks/touches near right corner
    if (width - mouseX <= 200) {
        contextMenu.style.borderRadius = "5px 0 5px 5px";
        contextMenu.style.left = width - menuWidth + "px";
        contextMenu.style.top = mouseY + "px";
        //right bottom
        if (height - mouseY <= 200) {
            contextMenu.style.top = mouseY - menuHeight + "px";
            contextMenu.style.borderRadius = "5px 5px 0 5px";
        }
    }
    //left
    else {
        contextMenu.style.borderRadius = "0 5px 5px 5px";
        contextMenu.style.left = mouseX + "px";
        contextMenu.style.top = mouseY + "px";
        //left bottom
        if (height - mouseY <= 200) {
            contextMenu.style.top = mouseY - menuHeight + "px";
            contextMenu.style.borderRadius = "5px 5px 5px 0";
        }
    }
    //display the menu
    contextMenu.style.visibility = "visible";
});

//if user clicks outside the menu HIDE CONTEXT MENU (for click devices)
$("body").on("click", "*", function (e) {
    let contextMenu = document.getElementById("tree-context-menu");
    if (!contextMenu.contains(e.target)) {
        contextMenu.style.visibility = "hidden";
    }
});



//CONTEXTUAL MENU ACTIONS HOVER HANDLER
$("body").on("mouseover", "[data-tree-item-action]", function (e) {
    const selector = $(this).parent().attr("data-selector");  
    //highlight item in tree
    $("#tree-body .tree-view-item.active").removeClass("active");
    $("#tree-body .tree-view-item[data-selector='" + selector + "']").addClass("active");
});


//CONTEXTUAL MENU ACTIONS CLICK HANDLER
$("body").on("click", "[data-tree-item-action]", function (e) {
    e.preventDefault();
    e.stopPropagation();
    document.getElementById("tree-context-menu").style.visibility = "hidden";
    const selector = $(this).parent().attr("data-selector"); 

    switch ($(this).attr("data-tree-item-action")) {
        case "edit-properties":
            openSidePanel(selector);
            break;
        case "edit-html":
            openPartialHtmlEditor(selector);
            break;
        case "ai-assistant":
            revealSidePanel("ai-assistant", selector);
            localStorage.setItem('backup_outerhtml_before_ai', getPageHTMLOuter(selector));
            break;
        case "replace-section":
            revealSidePanel("sections", selector);
            $("section[item-type=sections] .sidepanel-tabs a:first").click(); //open first tab 
            break;
        case "replace-block":
            revealSidePanel("blocks", selector);
            break;
        case "copy-content":
            copyToClipboard(selector);
            break;
        case "paste-content":
            pasteFromClipboard(selector)
            break;
        case "duplicate-item":
            duplicateElement(selector);
            break;
        case "delete-item":
            deleteElement(selector);
            break;
        case "move-up":
            moveElementUp(selector);
            break;
        case "move-down":
            moveElementDown(selector);
            break;
        case "save-to-library":
            openSaveSnippetModal("", selector);
            break;
        default:
            console.log("Something went horribly wrong...");
    }
});

