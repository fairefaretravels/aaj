/* ===== EDIT THIS FILE to manage the store ===== */
const SITE = {
  email: "houseofmedia.marketing@gmail.com",
  cashapp: "$morefire",
  shipping: null,            // number (e.g. 6) once confirmed; null = "to be confirmed"
  paypalClientId: "",        // PUBLIC PayPal client ID only. Never put a secret here.
  currency: "USD"
};
const CATEGORIES = [
  { id: "charm-sets", name: "Charm Sets", image: "CS1.JPEG", blurb: "Build a story, one charm at a time." },
  { id: "beaded-necklaces", name: "Beaded Necklaces", image: "BN GROUP 1.JPEG", blurb: "Hand-strung color and texture." },
  { id: "charm-necklaces", name: "Charm Necklaces", image: "CN GROUP 1.JPEG", blurb: "Pieces made to be worn daily." },
  { id: "italian-charm-bracelets", name: "Italian Charm Bracelets", image: "ICB GROUP 1.JPEG", blurb: "Classic links, personal meaning." },
  { id: "paperclip-necklaces", name: "Paperclip Necklaces", image: "PC1.JPEG", blurb: "Clean lines, easy layering." },
  { id: "advent-gift-set", name: "Advent Gift Set", image: "A CHRISTMAS 1.JPEG", blurb: "Twenty-four moments of surprise." },
  { id: "charm-bar", name: "Charm Bar", image: "CB1.JPEG", blurb: "Choose your own charms." }
];
// price: number or null (null = "Price coming soon"). collection:true = group photo, "Inquire" only.
// available:false = Sold out. badge: "New" | "Featured" | "".
const PRODUCTS = [
  { id: "charm-set", name: "Charm Set", category: "charm-sets", image: "CS1.JPEG", price: null, description: "A curated set of charms to start or grow your collection.", featured: true, available: true, badge: "Featured" },
  { id: "beaded-necklace-1", name: "Beaded Necklace", category: "beaded-necklaces", image: "BN1.JPEG", price: null, description: "A beaded necklace with a soft, handmade feel.", featured: true, available: true, badge: "" },
  { id: "beaded-necklace-2", name: "Beaded Necklace II", category: "beaded-necklaces", image: "BN2.JPEG", price: null, description: "A second beaded style, easy to layer or wear alone.", featured: false, available: true, badge: "" },
  { id: "beaded-necklace-collection", name: "Beaded Necklace Collection", category: "beaded-necklaces", image: "BN GROUP 1.JPEG", price: null, description: "The full beaded necklace range. Contact us about specific styles.", featured: false, available: true, collection: true, badge: "" },
  { id: "charm-necklace-1", name: "Charm Necklace", category: "charm-necklaces", image: "CN2.JPEG", price: null, description: "A charm necklace made for everyday wear.", featured: true, available: true, badge: "" },
  { id: "charm-necklace-2", name: "Charm Necklace II", category: "charm-necklaces", image: "CN3.JPEG", price: null, description: "Another charm necklace style from the collection.", featured: false, available: true, badge: "" },
  { id: "charm-necklace-collection", name: "Charm Necklace Collection", category: "charm-necklaces", image: "CN GROUP 1.JPEG", price: null, description: "The full charm necklace range. Contact us about specific styles.", featured: false, available: true, collection: true, badge: "" },
  { id: "italian-charm-bracelet-collection", name: "Italian Charm Bracelet Collection", category: "italian-charm-bracelets", image: "ICB GROUP 1.JPEG", price: null, description: "Italian charm bracelets in the collection. Contact us about specific styles.", featured: true, available: true, collection: true, badge: "" },
  { id: "paperclip-necklace", name: "Paperclip Necklace", category: "paperclip-necklaces", image: "PC1.JPEG", price: null, description: "A paperclip-link necklace with a clean, modern line.", featured: true, available: true, badge: "" },
  { id: "advent-gift-set", name: "Advent Gift Set", category: "advent-gift-set", image: "A CHRISTMAS 1.JPEG", price: null, description: "A countdown gift set for the holiday season.", featured: true, available: true, badge: "New" },
  { id: "charm-bar", name: "Charm Bar", category: "charm-bar", image: "CB1.JPEG", price: null, description: "Pick charms and build a piece that is yours.", featured: false, available: true, badge: "" }
];
