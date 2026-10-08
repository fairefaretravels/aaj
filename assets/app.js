const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const img = f => "assets/images/" + encodeURI(f);
const money = n => n == null ? "Price coming soon" : "$" + n.toFixed(2);
const catName = id => (CATEGORIES.find(c => c.id === id) || {}).name || "";
const param = k => new URLSearchParams(location.search).get(k);
const NAV = [["Home", "index.html"], ["Shop", "shop.html"], ["Collections", "index.html#categories"], ["Affiliate & Events", "index.html#affiliate"], ["About", "about.html"], ["Contact", "contact.html"]];

function layout() {
  $("#site-header").innerHTML = `<header class="hdr"><a class="brand" href="index.html">Arie Alexander</a>
  <nav id="nav" class="nav" aria-label="Main">${NAV.map(n => `<a href="${n[1]}">${n[0]}</a>`).join("")}</nav>
  <button class="icon" id="cartBtn" aria-label="Open cart">Cart <span id="cartCount" class="count">0</span></button>
  <button class="icon menu" id="menuBtn" aria-expanded="false" aria-controls="nav">Menu</button></header>
  <div class="scrim" id="scrim"></div>
  <aside class="drawer" id="drawer" aria-label="Shopping cart" aria-hidden="true"><div class="dh"><h2>Your cart</h2><button class="icon" id="cartClose">Close</button></div><div id="cartBody"></div></aside>`;
  $("#site-footer").innerHTML = `<footer class="ftr"><img src="${img("aa.JPEG")}" alt="Arie Alexander logo" width="120" height="120" loading="lazy">
  <div><p class="serif big">Arie Alexander</p><p>A Time to Remember</p></div>
  <div><a href="mailto:${SITE.email}">${SITE.email}</a><p>Cash App: ${SITE.cashapp}</p></div>
  <p class="small">&copy; ${new Date().getFullYear()} Arie Alexander. All rights reserved.</p></footer>`;
  const nav = $("#nav"), mb = $("#menuBtn"), sc = $("#scrim"), dr = $("#drawer");
  const setMenu = o => { nav.classList.toggle("open", o); mb.setAttribute("aria-expanded", o); sc.classList.toggle("on", o || dr.classList.contains("open")); };
  const setCart = o => { dr.classList.toggle("open", o); dr.setAttribute("aria-hidden", !o); sc.classList.toggle("on", o); if (o) $("#cartClose").focus(); };
  mb.onclick = () => setMenu(!nav.classList.contains("open"));
  $("#cartBtn").onclick = () => setCart(true); $("#cartClose").onclick = () => setCart(false);
  sc.onclick = () => { setMenu(false); setCart(false); };
  document.addEventListener("keydown", e => { if (e.key === "Escape") { setMenu(false); setCart(false); } });
  nav.onclick = e => e.target.tagName === "A" && setMenu(false);
  window.openCart = () => setCart(true);
}
function renderCart() {
  const L = Cart.lines(); $("#cartCount").textContent = Cart.count();
  $("#cartBody").innerHTML = L.length ? L.map(l => `<div class="line"><img src="${img(l.p.image)}" alt="${l.p.name}"><div><b>${l.p.name}</b><div>${money(l.p.price)}</div>
  <div class="qty"><button data-dec="${l.id}" aria-label="Decrease quantity">&minus;</button><span>${l.q}</span><button data-inc="${l.id}" aria-label="Increase quantity">+</button><button class="link" data-rm="${l.id}">Remove</button></div></div></div>`).join("") +
    `<div class="sum"><span>Subtotal</span><b>${Cart.hasUnpriced() ? "To be confirmed" : money(Cart.subtotal())}</b></div><a class="btn" href="checkout.html">Checkout</a> <button class="btn ghost" data-clear>Clear cart</button>`
    : `<p class="empty">Your cart is empty. <a href="shop.html">Browse the collection</a>.</p>`;
}
function card(p) {
  const act = p.available === false ? `<button class="btn" disabled>Sold out</button>` : p.collection
    ? `<a class="btn ghost" href="contact.html?subject=${encodeURIComponent("Inquiry: " + p.name)}">Inquire</a>` : `<button class="btn" data-add="${p.id}">Add to Cart</button>`;
  const badge = p.available === false ? "Sold out" : p.badge;
  return `<article class="card reveal"><a class="ph" href="product.html?id=${p.id}"><img src="${img(p.image)}" alt="${p.name}" loading="lazy">${badge ? `<span class="badge">${badge}</span>` : ""}</a>
  <div class="ci"><p class="cat">${catName(p.category)}</p><h3><a href="product.html?id=${p.id}">${p.name}</a></h3><p class="pr">${money(p.price)}</p>${act}</div></article>`;
}
const catCard = c => `<a class="cc reveal" href="shop.html?cat=${c.id}"><img src="${img(c.image)}" alt="${c.name}" loading="lazy"><span><b class="serif">${c.name}</b>${c.blurb}</span></a>`;

function pages() {
  const pg = document.body.dataset.page;
  if ($("#cats")) $("#cats").innerHTML = CATEGORIES.map(catCard).join("");
  if ($("#featured")) $("#featured").innerHTML = PRODUCTS.filter(p => p.featured).map(card).join("");
  if (pg === "shop") {
    const cur = param("cat") || "all";
    $("#filters").innerHTML = [{ id: "all", name: "All" }, ...CATEGORIES].map(c => `<a href="shop.html${c.id === "all" ? "" : "?cat=" + c.id}" ${c.id === cur ? 'aria-current="true"' : ""}>${c.name}</a>`).join("");
    const list = PRODUCTS.filter(p => cur === "all" || p.category === cur);
    $("#grid").innerHTML = list.length ? list.map(card).join("") : `<p class="empty">Nothing here yet. New pieces are coming.</p>`;
  }
  if (pg === "product") {
    const p = PRODUCTS.find(x => x.id === param("id"));
    if (!p) { $("#detail").innerHTML = `<p class="empty">Product not found. <a href="shop.html">Back to shop</a>.</p>`; return; }
    document.title = p.name + " | Arie Alexander";
    const buy = p.available === false ? `<button class="btn" disabled>Sold out</button>` : p.collection
      ? `<p>This photo shows a group of styles. Please contact us to ask about a specific piece.</p><a class="btn" href="contact.html?subject=${encodeURIComponent("Inquiry: " + p.name)}">Inquire</a>`
      : `<label class="ql">Quantity <input id="q" type="number" min="1" value="1"></label><button class="btn" id="addQ">Add to Cart</button>`;
    $("#detail").innerHTML = `<img class="big-img" src="${img(p.image)}" alt="${p.name}"><div><p class="cat">${catName(p.category)}</p><h1 class="serif">${p.name}</h1><p class="pr">${money(p.price)}</p><p>${p.description}</p>${buy}<p><a class="link" href="shop.html">Continue shopping</a></p></div>`;
    const a = $("#addQ"); if (a) a.onclick = () => { Cart.add(p.id, Math.max(1, +$("#q").value || 1)); openCart(); };
  }
  if (pg === "contact") {
    const s = param("subject"); if (s) $("#subject").value = s;
    $("#cform").onsubmit = e => { e.preventDefault(); const f = e.target;
      location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(f.subject.value)}&body=${encodeURIComponent(f.message.value + "\n\n" + f.name.value + " (" + f.email.value + ")")}`; };
  }
  if ($("#news")) $("#news").onsubmit = e => { e.preventDefault(); location.href = `mailto:${SITE.email}?subject=${encodeURIComponent("Join the list")}&body=${encodeURIComponent("Please add me: " + e.target.email.value)}`; };
  if (pg === "checkout") checkout();
}
function checkout() {
  const L = Cart.lines(), sub = Cart.subtotal(), ship = SITE.shipping, total = sub + (ship || 0);
  $("#summary").innerHTML = L.length ? L.map(l => `<div class="sum"><span>${l.p.name} &times; ${l.q}</span><span>${l.p.price == null ? "TBC" : money(l.p.price * l.q)}</span></div>`).join("") +
    `<div class="sum"><span>Subtotal</span><span>${Cart.hasUnpriced() ? "To be confirmed" : money(sub)}</span></div><div class="sum"><span>Shipping</span><span>${ship == null ? "To be confirmed" : money(ship)}</span></div><div class="sum"><b>Total</b><b>${Cart.hasUnpriced() || ship == null ? "To be confirmed" : money(total)}</b></div>` : `<p class="empty">Your cart is empty. <a href="shop.html">Shop the collection</a>.</p>`;
  const note = $("#paynote"), form = $("#cofo");
  if (!L.length) return;
  if (!SITE.paypalClientId || Cart.hasUnpriced() || ship == null) { note.textContent = "Online payment is not available yet. Please email " + SITE.email + " to complete your order."; return; }
  const s = document.createElement("script"); s.src = `https://www.paypal.com/sdk/js?client-id=${encodeURIComponent(SITE.paypalClientId)}&currency=${SITE.currency}`;
  s.onload = () => paypal.Buttons({
    onClick: (d, a) => form.reportValidity() ? a.resolve() : a.reject(),
    createOrder: (d, a) => { const f = new FormData(form); return a.order.create({ purchase_units: [{ amount: { currency_code: SITE.currency, value: total.toFixed(2) },
      shipping: { name: { full_name: f.get("name") }, address: { address_line_1: f.get("address"), admin_area_2: f.get("city"), admin_area_1: f.get("state"), postal_code: f.get("zip"), country_code: "US" } } }] }); },
    onApprove: (d, a) => a.order.capture().then(() => { Cart.clear(); $("#checkout").innerHTML = `<h1 class="serif">Thank you</h1><p>Your order is confirmed. A receipt is on its way from PayPal.</p><a class="btn" href="shop.html">Keep shopping</a>`; }),
    onError: () => { note.textContent = "Payment could not be completed. Please try again or email " + SITE.email + "."; }
  }).render("#paypal");
  document.body.append(s);
}
document.addEventListener("click", e => {
  const t = e.target, g = a => t.dataset[a];
  if (g("add")) { Cart.add(g("add")); openCart(); }
  if (g("inc")) Cart.setQty(g("inc"), Cart.items().find(x => x.id === g("inc")).q + 1);
  if (g("dec")) Cart.setQty(g("dec"), Cart.items().find(x => x.id === g("dec")).q - 1);
  if (g("rm")) Cart.remove(g("rm"));
  if (t.hasAttribute("data-clear")) Cart.clear();
});
function reveal() {
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } }), { threshold: .12 });
  $$(".reveal").forEach(el => { el.style.setProperty("--i", [...el.parentElement.children].indexOf(el) % 4); io.observe(el); });
}
layout(); pages(); renderCart(); reveal();
document.addEventListener("cart:change", () => { renderCart(); if (document.body.dataset.page === "checkout") location.reload(); });
