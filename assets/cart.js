const Cart = {
  key: "aaj-cart",
  items() { try { return JSON.parse(localStorage.getItem(this.key)) || []; } catch (e) { return []; } },
  save(a) { try { localStorage.setItem(this.key, JSON.stringify(a)); } catch (e) {} document.dispatchEvent(new Event("cart:change")); },
  add(id, q = 1) { const a = this.items(), i = a.find(x => x.id === id); i ? i.q += q : a.push({ id, q }); this.save(a); },
  setQty(id, q) { this.save(this.items().map(x => x.id === id ? { ...x, q } : x).filter(x => x.q > 0)); },
  remove(id) { this.save(this.items().filter(x => x.id !== id)); },
  clear() { this.save([]); },
  lines() { return this.items().map(x => ({ ...x, p: PRODUCTS.find(p => p.id === x.id) })).filter(x => x.p); },
  count() { return this.lines().reduce((n, l) => n + l.q, 0); },
  subtotal() { return this.lines().reduce((n, l) => n + (l.p.price || 0) * l.q, 0); },
  hasUnpriced() { return this.lines().some(l => l.p.price == null); }
};
