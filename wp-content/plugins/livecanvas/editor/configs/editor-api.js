(() => {
	// ===== utils (scoped) =====
	const n = s => String(s||'').trim();
	const same = (a,b) => n(a).toLowerCase() === n(b).toLowerCase();
	const clamp = (x,min,max) => Math.max(min, Math.min(x,max));

	// ===== adapters (scoped) =====
	function Blocks() {
		if (typeof theBlocks !== 'object') throw new Error('theBlocks missing/invalid');
		const T = theBlocks;
		const ensureCategory = (cat) => {
			if(!cat) throw new Error('category required');
			if (!Object.prototype.hasOwnProperty.call(T, cat) || typeof T[cat] !== 'object' || !Array.isArray(T[cat].blocks)) {
				T[cat] = { description: '', blocks: [] };
			}
			return cat;
		};
		return {
			get(cat){ return (T[cat] && typeof T[cat] === 'object' && Array.isArray(T[cat].blocks)) ? T[cat].blocks : []; },
			set(cat, arr){
				if (!Array.isArray(arr)) throw new Error('Blocks.set expects an array of blocks');
				if (!arr.length) { delete T[cat]; return; }
				const key = ensureCategory(cat);
				T[key].blocks = arr;
			},
			cats(){ return Object.keys(T); },
			ensure(cat){ return ensureCategory(cat); },
			find(cat,name){ return this.get(cat).findIndex(it => same(it?.name, name)); },
			norm(def){
				const name = n(def?.name), tpl = n(def?.template_html);
				if(!name || !tpl) throw new Error('Block needs { name, template_html }');
				return { name, template_html: tpl, icon_html: String(def?.icon_html||''), _origin: def?._origin || 'custom' };
			}
		};
	}
	function Editables() {
		const S = theEditorConfig?.editable_elements;
		if (!S || typeof S !== 'object') throw new Error('theEditorConfig.editable_elements missing/invalid');

		const toList = () => Object.entries(S).map(([name, v]) => ({ name, ...v }));
		const fromList = (arr) => {
			const fresh = {};
			for (const it of arr) {
				const key = n(it?.name); if (!key) continue;
				const { name:_n, _origin, ...rest } = it;
				fresh[key] = { ...rest, _origin: _origin || 'custom' };
			}
			Object.keys(S).forEach(k => delete S[k]);
			Object.assign(S, fresh);
		};

		return {
			get(){ return toList(); },
			set(_cat, arr){ fromList(arr); },
			cats(){ return ['__root__']; },
			ensure(){ return '__root__'; },
			find(_cat,name){ return toList().findIndex(it => same(it?.name, name)); },
			norm(def){
				const name = n(def?.name), sel = n(def?.selector);
				if(!name || !sel) throw new Error('Editable needs { name, selector }');
				return { name, selector: sel, _origin: def?._origin || 'custom' };
			}
		};
	}

	// ===== core ops (scoped) =====
	function addItem(Adapter, { category=null, item, insertAt='end', overwrite=false } = {}) {
		const A = Adapter();
		const cat = A.ensure(category || '__root__');
		const norm = A.norm(item);
		let list = A.get(cat);
		const i = A.find(cat, norm.name);

		if (i !== -1) { if (overwrite) list.splice(i,1,norm); A.set(cat, list); return; }

		let idx = list.length;
		if (insertAt === 'start') idx = 0;
		else if (typeof insertAt === 'number') idx = clamp(insertAt, 0, list.length);
		else if (insertAt && typeof insertAt === 'object') {
			const key = 'before' in insertAt ? 'before' : ('after' in insertAt ? 'after' : null);
			if (key) {
				const j = list.findIndex(it => same(it?.name, insertAt[key]));
				idx = j === -1 ? list.length : (key === 'before' ? j : j+1);
			}
		}
		list.splice(idx, 0, norm);
		A.set(cat, list);
	}
	function removeItem(Adapter, { category=null, name }) {
		if (!name) throw new Error('removeItem: `name` required');
		const A = Adapter();
		const cat = (A.cats().length === 1) ? A.ensure('__root__') : category;
		if (!cat) throw new Error('removeItem(blocks): `category` required');
		A.set(cat, A.get(cat).filter(it => !same(it?.name, name)));
	}
	function removeCategory(Adapter, { category=null }) {
		const A = Adapter();
		if (A.cats().length === 1) { A.set('__root__', []); return; }
		if (!category) throw new Error('removeCategory(blocks): `category` required');
		A.set(category, []);
	}
	function purgeBuiltIns(Adapter, { categories=null, isBuiltIn = it => it?._origin !== 'custom' } = {}) {
		const A = Adapter();
		const cats = categories || A.cats();
		for (const c of cats) A.set(c, A.get(c).filter(it => !isBuiltIn(it)));
	}

	// ===== public, named globals (only these leak) =====
	const g = (typeof globalThis !== 'undefined') ? globalThis : window;

	// Blocks (back-compat names)
	g.addBlock             = (cat, def, opts={}) => addItem(Blocks,   { category:cat, item:def, ...opts });
	g.removeBlock          = (cat, name, opts={}) => removeItem(Blocks, { category:cat, name, ...opts });
	g.removeCategory       = (cat, opts={}) => removeCategory(Blocks, { category:cat, ...opts });
	g.removeBuiltInBlocks  = (opts={}) => purgeBuiltIns(Blocks, opts);

	// Editables
	g.addEditable          = (name, def, opts={}) => addItem(Editables, { item:{ name, ...def }, ...opts });
	g.removeEditable       = (name, opts={}) => removeItem(Editables, { name, ...opts });
	g.removeAllEditables   = (opts={}) => removeCategory(Editables, opts);
	g.removeBuiltInEditables = (opts={}) => purgeBuiltIns(Editables, opts);
})();
