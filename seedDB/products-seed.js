const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const Product = require("../models/product");
const Category = require("../models/category");
const mongoose = require("mongoose");
const faker = require("faker");
const connectDB = require("./../config/db");
connectDB();

async function seedDB() {
  faker.seed(0);

  //----------------------Backpacks
  const kitchen_titles = [
    "Utopia Towels Kitchen Towels",
    "Kitchen Gizmo Snap N Strain Pot",
    "Gramercy Kitchen Co. Adjustable Stainless Steel Mandoline Food Slicer",
    "Black Kitchen Faucets with Pull Down Sprayer",
    "Etekcity Food Kitchen Scale",
    "Sharp Kitchen Shears",
    "Alpine Industries Wall Mounted Automatic Soap Dispenser",
    "Bamboo Ziplock Bag Storage Organizer and Dispenser",
    "2pcs Under Cabinet Kitchen Utensil Hooks",
    "Magnetic Measuring Spoons Set",
  ];
  const kitchen_imgs = [
    "https://m.media-amazon.com/images/I/9102gVkpx8L._AC_SX679_.jpg",
    "https://m.media-amazon.com/images/I/61Wt0QY-adL._AC_SX679_.jpg",
    "https://m.media-amazon.com/images/I/81VH5TLSoyL._AC_SX679_.jpg",
    "https://m.media-amazon.com/images/I/41JeUxRRI8L._AC_SX679_.jpg",
    "https://m.media-amazon.com/images/I/7157x4p8zTL._SX522_.jpg",
    "https://m.media-amazon.com/images/I/41pMxmChD2L._AC_SX466_.jpg",
    "https://m.media-amazon.com/images/I/61zkQMMCYkL._AC_SX679_.jpg",
    "https://m.media-amazon.com/images/I/713kAno-jjL._AC_SX466_.jpg",
    "https://m.media-amazon.com/images/I/611d+YLjmaL._AC_SX466_.jpg",
    "https://m.media-amazon.com/images/I/71pmLLyGytS._AC_SX679_.jpg",
  ];

  //--------------------Travel Bags
  const toys_titles = [
    "Toy Rocket Launcher for kids",
    "iHaHa 236 PCS Construction Race Tracks for Kids Boys Toys",
    "Hot Wheels Marvel Spider-Man Large Scale Character Car!",
    "LLMoose Hover Ball for Boys & Girls",
    "YEEBAY Interactive Whack A Frog Game",
    "TOYFIT 4 in 1 LED Light Airplane Launcher Toy Set",
    "TEMI Kids Bow and Arrow Set",
    "Threeking RC Cars Stunt car Remote Control Car",
    "Dolanus Remote Control Car",
    "BROADREAM Stocking Stuffers Boys Toys  ",
    "Paw Patrol True Metal Classic Gift",
  ];

  const toys_imgs = [
    "https://m.media-amazon.com/images/I/81o39uHgjvL._AC_SX466_.jpg",
    "https://m.media-amazon.com/images/I/813Txvn-Q+L._AC_SX679_.jpg",
    "https://m.media-amazon.com/images/I/71TMGWer2cL._AC_SX679_.jpg",
    "https://m.media-amazon.com/images/I/81mfx+IzJiL._AC_UX679_.jpg",
    "https://m.media-amazon.com/images/I/61l5pa4xbsL._AC_SX679_.jpg",
    "https://m.media-amazon.com/images/I/71bCOfRvNhL._AC_SX679_.jpg",
    "https://m.media-amazon.com/images/I/71xzZpt0DyL._AC_SX679_.jpg",
    "https://m.media-amazon.com/images/I/71vT-bNjraL._AC_SX679_.jpg",
    "https://m.media-amazon.com/images/I/71cILvXereL._AC_SX679_.jpg",
    "https://m.media-amazon.com/images/I/71Kkm6AvwNL._AC_SX679_.jpg",
    "https://m.media-amazon.com/images/I/81QUaaHbJ3L._AC_SX679_.jpg",
  ];

  //--------------------Briefcases
  const mens_wear_titles = [
    "NITAGUT Mens Fashion Casual Front",
    "Wrangler Men's 0936 Cowboy Cut Slim Fit",
    "TOLOER Men's Activewear Full Zip Warm Tracksuit",
    "Helly-Hansen Men's Workwear Manchester Rain Jacket",
    "Wrangler Men's Rugged Wear Unlined Denim Jacket",
  ];

  const mens_wear_imgs = [
    "https://m.media-amazon.com/images/I/81tpGc13OgL._AC_UX679_.jpg",
    "https://m.media-amazon.com/images/I/71JwjOw52zL._AC_UY741_.jpg",
    "https://m.media-amazon.com/images/I/81eUoKLBAyL._AC_UX679_.jpg",
    "https://m.media-amazon.com/images/I/61Goprhpq6L._AC_UX679_.jpg",
    "https://m.media-amazon.com/images/I/91NmFLqMkML._AC_UX679_.jpg",
  ];

  //--------------------Mini Bags
  const shoes_titles = [
    "Essentials Women's Loafer Flat",
    "Under Armour Men's Charged Assert 9 Running Shoe",
    "Skechers Women's Go Joy Walking Shoe Sneaker",
    "Clarks Men's Tilden Cap Oxford Shoe",
    "adidas Men's Lite Racer Adapt 4.0 Running Shoes",
    "Sperry Men's STRIPER II CVO Core Sneaker",
    "Skechers Men's Relment-Pelmo Hiking Boot",
    "NCCB Womens Loafers Slip On Sneakers for Women Comfort Memory Foam Casual Shoes",
    "Clarks Women's Linvale Jerica Pump",
    "adidas Men's Tech Response Golf Shoes",
  ];
  const shoes_imgs = [
    "https://m.media-amazon.com/images/I/51l6Z1waNML._AC_UX575_.jpg",
    "https://m.media-amazon.com/images/I/711p69IpvJL._AC_UX575_.jpg",
    "https://m.media-amazon.com/images/I/71yA5b-1ZKL._AC_UX575_.jpg",
    "https://m.media-amazon.com/images/I/71s7cDbaxCL._AC_UX695_.jpg",
    "https://m.media-amazon.com/images/I/81WVte5m61L._AC_UX575_.jpg",
    "https://m.media-amazon.com/images/I/61bFDXILqnL._AC_UY575_.jpg",
    "https://m.media-amazon.com/images/I/81cCSR5KWiL._AC_UX575_.jpg",
    "https://m.media-amazon.com/images/I/71-OxKn8hVL._AC_UY575_.jpg",
    "https://m.media-amazon.com/images/I/615Qg2N3yEL._AC_UX575_.jpg",
    "https://m.media-amazon.com/images/I/71YFXg+-ZeL._AC_UX575_.jpg",
  ];

  //--------------------Large Handags

  const smartphones_titles = [
    "TCL 10 SE Unlocked Android Smartphone",
    "SAMSUNG Galaxy S22 Ultra Smartphone",
    "Motorola One 5G Ace",
    "Tracfone Alcatel TCL A3",
    "Google Pixel 4a",
    "OnePlus 8 Glacial Green",
    "Samsung Galaxy A72 (A725M/DS) 128GB Dual SIM",
    "Samsung Galaxy A12",
    "Samsung Galaxy Z Fold 2 5G",
    "TCL 20 SE 6.82' Unlocked Cellphone",
    "Moto G7 Plus",
  ];
  const smartphones_imgs = [
    "https://m.media-amazon.com/images/I/612hZ6vLaoL._AC_SX679_.jpg",
    "https://m.media-amazon.com/images/I/61U6oC65TTL._AC_SX466_.jpg",
    "https://m.media-amazon.com/images/I/71GbORP-umL._AC_SX466_.jpg",
    "https://m.media-amazon.com/images/I/61-fB+GkifL._AC_SX466_.jpg",
    "https://m.media-amazon.com/images/I/7199N-Uz2AL._AC_SX679_.jpg",
    "https://m.media-amazon.com/images/I/51uEwkqjZTL._AC_SX679_.jpg",
    "https://m.media-amazon.com/images/I/51KZKX9MhKS._AC_SX679_.jpg",
    "https://m.media-amazon.com/images/I/618LuqyIX6L._AC_SX679_.jpg",
    "https://m.media-amazon.com/images/I/71K7LHNK7DL._AC_SX679_.jpg",
    "https://m.media-amazon.com/images/I/61vGqZ1RVbS._AC_SX679_.jpg",
    "https://m.media-amazon.com/images/I/81N4XZjeBvL._AC_SX466_.jpg",
  ];

  //-----------------Totes

  const tvs_titles = [
    "TCL 40-inch 1080p Smart LED Roku TV",
    "Philips 32PFL4664 Roku TV Certified Renewed",
    "VIZIO 32-inch D-Series 720p Smart TV with Apple AirPlay",
    "SANSUI ES24Z1, 24 inch TV HD (720P) Small LED TV",
    "Insignia 43-inch Class F30 Series LED 4K UHD Smart Fire TV",
    "LG OLED C1 Series 77” Alexa Built-in 4k Smart TV",
    "LG 65QNED90UPA Alexa Built-in QNED MiniLED 90 Series",
    "SAMSUNG 65-Inch Class Crystal UHD AU8000 Series",
    "SAMSUNG 50-Inch Class Neo QLED QN90A Series",
    "Samsung 43-inch TU-7000 Series Class Smart TV",
  ];
  const tvs_imgs = [
    "https://m.media-amazon.com/images/I/71MVe3Ym8yL._AC_SX466_.jpg",
    "https://m.media-amazon.com/images/I/51uUhUdVytL._AC_SX466_.jpg",
    "https://m.media-amazon.com/images/I/81jI6MrVIXL._AC_SX466_.jpg",
    "https://m.media-amazon.com/images/I/713ZK2DXsSL._AC_SX466_.jpg",
    "https://m.media-amazon.com/images/I/81DnMWhQ2gL._AC_SX466_.jpg",
    "https://m.media-amazon.com/images/I/91otJ1fmuXS._AC_SX466_.jpg",
    "https://m.media-amazon.com/images/I/71LQgk6GGQS._AC_SX466_.jpg",
    "https://m.media-amazon.com/images/I/71LJJrKbezL._AC_SX466_.jpg",
    "https://m.media-amazon.com/images/I/913+l9CB6cL._AC_SX466_.jpg",
    "https://m.media-amazon.com/images/I/51YgPGHEQ5L._AC_SX466_.jpg",
  ];
  //-----------------------Purses
  const watches_titles = [
    "Mens Watches BY BENYAR Chronograph Analog Quartz Movement Leather Band",
    "Fossil Men's Nate Stainless Steel Quartz Chronograph Watch",
    "Beeasy Stainless Steel Mens Watches Analog Waches for Man Sport Work",
    "Timex Men's Expedition Scout 40 Watch",
    "Men's Fashion Business Quartz Watch with Stainless Steel Strap",
    "Fossil Men's Townsman Stainless Steel and Leather",
    "Fossil Men's Machine Stainless Steel Quartz",
    "Invicta Automatic Pro Diver Stainless Steel Watch",
    "Smart Watch for Men Fitness Tracker",
  ];
  const watches_imgs = [
    "https://m.media-amazon.com/images/I/71MFZZWSvRL._AC_UX679_.jpg",
    "https://m.media-amazon.com/images/I/718AVhhc1GL._AC_UX679_.jpg",
    "https://m.media-amazon.com/images/I/718AE08NWmL._AC_UX679_.jpg",
    "https://m.media-amazon.com/images/I/91WvnZ1g40L._AC_UY741_.jpg",
    "https://m.media-amazon.com/images/I/81x64+PbdUS._AC_UX679_.jpg",
    "https://m.media-amazon.com/images/I/81J80MqIAfL._AC_UX679_.jpg",
    "https://m.media-amazon.com/images/I/81w-NYEhqPL._AC_UY741_.jpg",
    "https://m.media-amazon.com/images/I/71e04Q53xlL._AC_UY741_.jpg",
    "https://m.media-amazon.com/images/I/71ZbSvDPdeL._AC_SX679_.jpg",
  ];


  async function seedProducts(titlesArr, imgsArr, categStr) {
    try {
      const categ = await Category.findOne({ title: categStr });
      for (let i = 0; i < titlesArr.length; i++) {
        let prod = new Product({
          productCode: faker.helpers.replaceSymbolWithNumber("####-##########"),
          title: titlesArr[i],
          imagePath: imgsArr[i],
          description: faker.lorem.paragraph(),
          price: faker.random.number({ min: 10, max: 50 }),
          manufacturer: faker.company.companyName(0),
          available: true,
          category: categ._id,
        });
        await prod.save();
      }
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async function closeDB() {
    console.log("CLOSING CONNECTION");
    await mongoose.disconnect();
  }

  await seedProducts(kitchen_titles, kitchen_imgs, "Kitchen");
  await seedProducts(mens_wear_titles, mens_wear_imgs, "Men's wear");
  await seedProducts(shoes_titles, shoes_imgs, "Shoes");
  await seedProducts(smartphones_titles,smartphones_imgs,"Smartphones");
  await seedProducts(toys_titles, toys_imgs, "Toys");
  await seedProducts(tvs_titles, tvs_imgs, "Tvs");
  await seedProducts(watches_titles, watches_imgs, "Watches");

  await closeDB();
}

seedDB();
