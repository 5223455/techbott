/**
 * Mavya - TechBott India AI Chatbot Agent
 * Smart Chat Widget + Full-Screen AI Product Recommendation Overlay
 */
(function () {
    'use strict';

    // Determine base path by finding this script's src
    let basePath = "";
    const scripts = document.getElementsByTagName('script');
    for (let i = 0; i < scripts.length; i++) {
        const src = scripts[i].getAttribute('src');
        if (src && src.includes('mavya-chatbot.js')) {
            basePath = src.replace('js/mavya-chatbot.js', '');
            break;
        }
    }

    // ─── Company Knowledge Base ───
    const KB = {
        company: {
            name: "TechBott India",
            tagline: "India's trusted partner for advanced industrial printing, coding & marking solutions — powering production lines across 20+ industries.",
            description: "TechBott India is a printing technology pioneer, specializing in the supply and service of various industrial printing solutions. With 25+ years of experience, 60 expert technicians, 300+ satisfied clients, and 120+ completed projects, we deliver exceptional service and top-notch printing solutions.",
            stats: { experience: "25+ Years", technicians: "60 Expert Technicians", clients: "300+ Satisfied Clients", projects: "120+ Completed Projects", team: "82 Dedicated Professionals" }
        },
        contact: {
            address: "07-004/A/85/P, JK Nagar, Jeedimetla, Hyderabad, Telangana - 500 055, India",
            phone: ["+91 73373 35751", "040 40207440"],
            email: { general: "marketing@techbottindia.com", info: "info@techbottindia.com" },
            whatsapp: "+91 7337335751",
            support: "24/7 supply and service available"
        },
        products: {
            "co2 lasers": {
                name: "CO2 Lasers",
                brand: "TechBott",
                models: "Opti CO2 Laser (30W)",
                features: "Up to 1,500 chars/sec marking speed, Class 4 (IEC/EN 60825-1:2014) rating, Air Cooled, IP54/IP65 ratings, TCP/IP & RS232 support.",
                applications: "Food & Beverage (PET, Glass, Cartons, Flexible), Pharmaceutical, FMCG, Packaging, Wire & Cable, Electronics, Automotive, Textile, Wood & Furniture.",
                materials: "Paper, Cardboard, Corrugated cartons, Wood, MDF, Acrylic, Leather, Rubber, Glass, PET, PVC, PP, PE, BOPP films, Laminated pouches, Ceramics.",
                printContent: "MFG/EXP Dates, Batch/Lot No, Serial No, Time/Shift Code, QR/Data Matrix, 1D Barcodes, Logos, Variable Data, Traceability Codes.",
                page: "pages/technology/CO2-lasers.html"
            },
            "fiber lasers": {
                name: "Fiber Lasers",
                brand: "TechBott",
                models: "OptiFy Fiber Laser (20W, 30W, 50W, 100W)",
                features: "Up to 2,000 chars/sec marking speed, Class 4, Air Cooled, Ytterbium (Yb) Pulsed Fiber. Supports OCR fonts, permanent laser marking, variable data, and barcodes.",
                applications: "Automotive (Engine parts, VIN plates), Electronics & Electrical, Medical Devices, Aerospace, Tools & Hardware, Industrial Manufacturing, Jewellery, Packaging Industry (Metal labels).",
                materials: "Metals (Stainless Steel, Mild Steel, Aluminium, Brass, Copper, Titanium, Gold, Silver, Platinum), Engineering Plastics (ABS, PC, Nylon, PBT).",
                printContent: "MFG/EXP Dates, Batch/Lot No, Serial/VIN Numbers, Time/Shift Code, QR/Data Matrix, 1D Barcodes, UID Codes, Logos, Part Numbers.",
                page: "pages/technology/Fiber-lasers.html"
            },
            "uv lasers": {
                name: "UV Lasers",
                brand: "TechBott",
                models: "Opti-Vu3x (3W), Opti-Vu5x (5W), Opti-Vu10x (10W)",
                features: "Ultraviolet light emission for precision marking. Multi-port marking, external trigger signals.",
                applications: "Pharmaceuticals (Blister packs, Ampoules), Food & Beverage (PET/Glass bottles, Caps), Cosmetics & Personal Care, Electronics (PCBs), Medical Devices, Packaging Industry (Flexible, Shrink sleeves, Cartons).",
                materials: "Plastic (PET, HDPE, PP, PE, PVC), Glass, Acrylic, Polycarbonate, ABS, Silicone, Rubber, Paper, Cardboard, Labels, Flexible films, Laminated pouches, Ceramics.",
                printContent: "MFG/EXP Dates, Batch/Lot No, Serial No, QR/Data Matrix, 1D Barcodes, Logos, Variable Data, Traceability Codes.",
                page: "pages/technology/UV-Lasers.html"
            },
            "cij printers": {
                name: "Continuous Inkjet (CIJ) Printers",
                brand: "TechBott",
                models: "300 Series (Model: 3260)",
                features: "Print height 2-20mm, 10.1-inch color touch screen, IP55 protection, 304 stainless steel, RoHS/CE/BIS certified, 22kg. Supports 1-5 lines. Over 40+ languages.",
                applications: "Food & Beverage (PET/Glass bottles, Pouches, Cartons), Pharmaceuticals (Blister packs, Labels), FMCG (Shampoo, Cosmetics), Packaging Industry, Wire & Cable, Building Materials, Automotive, Electronics, Chemical, Seed & Agriculture.",
                materials: "Plastic (PET, HDPE, PP, PVC), Glass, Metal, Paper, Cardboard, Flexible films, Laminates, Rubber, Wood, Foil.",
                printContent: "MFG/EXP Dates, Batch/Lot No, Serial No, Time/Shift Code, Logos, Barcodes, QR Codes, Data Matrix Codes, Variable Data.",
                page: "pages/technology/Continuous-Inkjet-(CIJ)-printers.html"
            },
            "tij printers": {
                name: "Thermal Inkjet (TIJ) Printers",
                brand: "TechBott",
                models: "HP Thermal Ink Jet T2.5 Technology based",
                features: "Resolution 150-600 dpi, printing height 1-25mm, printing speed up to 240m/min. 5\" and 7\" touch screen. GS1 Data Matrix, Zero breakdown, Ethernet/USB/RS232 connectivity.",
                applications: "Food & Beverage (PET/Plastic bottles, Milk pouches), Pharmaceuticals (Blister, Labels), FMCG (Cosmetics, Shampoo), Packaging Industry (Laminated sheets, Cartons), Logistics.",
                materials: "Plastic, Laminated pouches, Glass, Metal, Paper, Cardboard, Cartons, Labels, Flexible packaging (Depends on porous/non-porous ink).",
                printContent: "MFG/EXP Dates, Batch/Lot No, Serial No, Time/Shift Code, Barcode, QR Code, Data Matrix, Logos, Variable Data.",
                page: "pages/technology/Thermal-Inkjet-(TIJ)-printers.html"
            },
            "dod printers": {
                name: "Drop on Demand (DOD) Printers",
                brand: "TechBott",
                models: "Large character DOD series",
                features: "Print height 10-70mm, high-speed marking up to 90 m/min. Oil-based and solvent-based ink. Rugged design, touch screen interface, low maintenance valve-jet technology.",
                applications: "Packaging Industry (Corrugated, Master cartons), Food & Beverage (Shipping cases, Dairy), Pharmaceutical (Master cartons), FMCG, Seeds & Agriculture, Logistics & Warehousing, Building Materials (Cement, Tiles), Automotive.",
                materials: "Corrugated cardboard, Cardboard, Paper, Kraft paper, Paperboard, Wood, Fabric bags, Plastic films & Laminated pouches (with UV/solvent ink), Coated cartons.",
                printContent: "MFG/EXP Dates, Batch/Lot No, Serial No, Product Name/Description, Company Logo, 1D/QR/Data Matrix/GS1 Barcodes, Dynamic Numbering, Variable Data.",
                page: "pages/technology/Drop-on-Demand-(DOD)-printers.html"
            },
            "pij printers": {
                name: "Hi-Resolution Piezo Inkjet (PIJ) Printers",
                brand: "TechBott",
                models: "TB Series (Recirculating) & 8 Series (High-Speed)",
                features: "Up to 600 DPI, speeds up to 240 m/min, Android touchscreen, UV ink & oil-based ink support, SDK development kit, multi-angle installation.",
                applications: "Corrugated Cartons, Mono Cartons (Pharma, FMCG), Paper & Packaging, Food & Beverage, Logistics & Warehousing, Building Materials (Cement, Ceramics), Seeds & Agriculture.",
                materials: "Corrugated cardboard, Cardboard, Paper, Kraft paper, Paperboard, Wood, Fabric bags, Plastic films and laminated pouches (using UV/solvent ink).",
                printContent: "MFG/EXP Dates, Batch/Lot No, Serial No, Product Description, Company Logo, 1D/QR/Data Matrix/GS1-128 Barcodes, Variable Data, Graphics.",
                page: "pages/technology/Hi-Res-Piezo-Inkjet-(PIJ)-printers.html"
            },
            "tto printers": {
                name: "Thermal Transfer Over (TTO) Printers",
                brand: "TechBott",
                models: "Linx TT Series",
                features: "32mm & 53mm printheads at 300dpi, up to 250 prints per min. Operates without compressed air. CLARiSOFT message design software. Up to 1200m ribbon length.",
                applications: "Film, Foils, Paper, Carton, Plastics.",
                page: "pages/technology/Thermal-Transfer-Over-printers-(TTO).html"
            },
            "thermal transfer ribbon": {
                name: "Thermal Transfer Ribbon",
                brand: "TechBott",
                models: "Wax, Wax-Resin & Resin grades",
                features: "Superior smudge & scratch resistance, compatible with flat-head & near-edge printers, chemical resistant, low static, reduces print head wear.",
                applications: "Paper, Film, Foils, Textiles, Plastics.",
                page: "pages/technology/Thermal-Transfer-Ribbon.html"
            },
            "hx megalo": {
                name: "Hx-Megalo",
                brand: "MapleJet",
                features: "Large format TIJ printer for high-resolution printing on cartons and outer cases.",
                applications: "Corrugated Cartons & Boxes (Shipping, Export), Paper & Packaging, Logistics & Warehousing, Food & Beverage, Pharmaceutical, FMCG, Building Materials.",
                materials: "Oil-Based Ink: Corrugated cartons, Cardboard, Paper, Wood. UV Ink: Flexible films, Laminated pouches, Plastic pouches, Coated packaging.",
                printContent: "MFG/EXP Dates, Batch/Lot No, Serial No, Barcode (1D)/QR/Data Matrix, Variable Data, Logos, Graphics, Product Description, Shipping Info. (Up to 70mm print height).",
                page: "pages/products/Hx-Megalo.html",
                pdf: "brochures/Hx_Megalo_Catalogue_IN.pdf"
            },
            "hx ultro": {
                name: "Hx-Ultro",
                brand: "MapleJet",
                features: "Versatile thermal inkjet printer with superior print quality for diverse packaging applications.",
                applications: "Flexible Packaging (Pouches, Roll stock, Wrappers), Food & Beverage (Snacks, Frozen), FMCG (Detergent, Shampoo sachets), Pharmaceutical (Medical pouches), Industrial Packaging.",
                materials: "BOPP films, PET films, PE films, Laminated films, Flexible packaging, Aluminum foil, Plastic pouches, Non-porous packaging materials.",
                printContent: "MFG/EXP Dates, Batch/Lot No, Serial No, QR/Data Matrix, 1D Barcodes, Logos, Variable Data.",
                page: "pages/products/ultro.html",
                pdf: "brochures/Hx_Ultro_Catalogue_IN.pdf"
            },
            "ultro ctij": {
                name: "Hx Ultro CTIJ",
                brand: "MapleJet",
                features: "Extended print width TIJ printer for wider coding requirements on packaging lines.",
                page: "pages/products/ultro-ctij.html",
                pdf: "brochures/IN_Hx Ultro CTIJ-TBI.pdf"
            },
            "hx nitro": {
                name: "Hx Nitro TIJ",
                brand: "MapleJet",
                features: "Compact and fast TIJ printer ideal for high-speed production lines and small character coding.",
                applications: "Food & Beverage (PET/Plastic bottles, Milk pouches), Pharmaceuticals (Blister, Labels), FMCG (Cosmetics, Shampoo), Packaging Industry (Laminated sheets, Cartons), Logistics.",
                materials: "Plastic, Laminated pouches, Glass, Metal, Paper, Cardboard, Cartons, Labels, Flexible packaging (Depends on porous/non-porous ink).",
                printContent: "MFG/EXP Dates, Batch/Lot No, Serial No, Time/Shift Code, Barcode, QR Code, Data Matrix, Logos, Variable Data.",
                page: "pages/products/Hx-Nitro.html",
                pdf: "brochures/Hx_Nitro_Catalogue_IN.pdf"
            },
            "hx cartro": {
                name: "Hx-Cartro",
                brand: "MapleJet",
                features: "Cartridge-based TIJ printer offering easy maintenance and quick ink changeover for versatile coding.",
                applications: "Corrugated Cartons, Packaging Industry (Secondary packaging), Food & Beverage, Pharmaceutical, FMCG, Logistics & Warehousing, Industrial Manufacturing.",
                materials: "Corrugated cartons, Cardboard, Kraft paper, Paperboard, Paper cartons, Porous packaging materials.",
                printContent: "MFG/EXP Dates, Batch/Lot No, Serial No, Product Name, Alphanumeric Text, 1D/QR/Data Matrix Barcodes, Logos, Variable Data, External DB Info, Counters.",
                page: "pages/products/Hx-Cartro.html",
                pdf: "brochures/Hx_Cartro_Catalogue_IN.pdf"
            },
            "leibinger jet2neo": {
                name: "Leibinger JET2neo",
                brand: "Leibinger",
                models: "JET2neo",
                features: "Sealtronic print head technology, 7-inch touch screen display. Automated Sealtronic system prevents ink drying. Windows-based interface.",
                applications: "Food & Beverage (PET/Glass bottles, Pouches, Cartons), Pharmaceuticals (Blister packs, Labels), FMCG (Shampoo, Cosmetics), Packaging Industry, Wire & Cable, Building Materials, Automotive, Electronics, Chemical, Seed & Agriculture.",
                materials: "Plastic (PET, HDPE, PP, PVC), Glass, Metal, Paper, Cardboard, Flexible films, Laminates, Rubber, Wood, Foil.",
                printContent: "MFG/EXP Dates, Batch/Lot No, Serial No, Time/Shift Code, Logos, Barcodes, QR Codes, Data Matrix Codes, Variable Data.",
                page: "pages/technology/Leibinger.html",
                pdf: "brochures/JET2-NEO_Flyer_.pdf"
            },
            "jet 3 eco": {
                name: "Jet 3 Eco",
                brand: "Leibinger",
                models: "JET3eco",
                features: "Over 800 software functions, prints up to 5 lines. Print speeds up to 10 m/s. IP54/IP65 ratings, Sealtronic technology, multi-language UI.",
                applications: "Food & Beverage (High-speed bottling, Tetra packs), Pharmaceuticals (Tablet bottles, Blister packs), FMCG, Packaging Industry, Wire & Cable, Pipe & Extrusion, Automotive, Electronics, Chemical Industry, Seeds & Agriculture, Building Materials.",
                materials: "Plastic (PET, HDPE, LDPE, PP, PVC), Glass, Metal, Paper, Cardboard, Flexible films, Laminated pouches, Foil, Rubber, Wood, Cables/Pipes.",
                printContent: "MFG/EXP Dates, Batch/Lot No, Serial No, Shift Code, Time & Date, Logos, Barcodes, QR/Data Matrix Codes, Variable Data, Alphanumeric Text.",
                page: "pages/technology/Leibinger.html",
                pdf: "brochures/JET3_ECO_Flyer_.pdf"
            },
            "accessories": {
                name: "Accessories & Spare Parts",
                brand: "TechBott",
                features: "Power supplies, print head components, nozzles, filters, ink cartridges, consumables, makeup solutions, sensors, automation solutions, genuine replacement parts, maintenance kits, service components. Compatible with Domino, Videojet, Markem Imaje, and more.",
                page: "pages/general/Accessories.html"
            }
        },
        industries: [
            "Food & Beverages – beverage coding, confectionery, shelf-life clarity, traceability",
            "Cosmetics & Consumer Goods – batch numbers, barcodes, precision marking",
            "Industrial Goods – laser marking on cans/metal, CIJ printing on cables, regulatory compliance",
            "Pharmaceuticals – batch numbers, expiry dates, serialization codes, tamper-proof coding, drug safety",
            "Manufacturing, Packaging, Automotive, Medical/Healthcare, Logistics, Electronics, FMCG"
        ],
        certifications: [
            "ISO 9001:2015 Certified (Certificate No: 24MEQSM01)",
            "RoHS Certified",
            "CE Certified",
            "BIS (Bureau of Indian Standards) Certified"
        ],
        pages: {
            home: "index.html",
            about: "pages/general/about.html",
            products: "pages/general/Products.html",
            applications: "pages/general/Applications.html",
            certificate: "pages/general/Certificate.html",
            gallery: "pages/general/Products.html",
            contact: "pages/general/contact.html"
        }
    };

    // ─── Intent Matching ───
    // Product-specific intents
    const productIntents = [
        {
            keywords: ["co2", "carbon dioxide", "opti-co2", "co2 laser"],
            handler: () => formatProduct(KB.products["co2 lasers"])
        },
        {
            keywords: ["fiber", "fibre", "optify", "fiber laser"],
            handler: () => formatProduct(KB.products["fiber lasers"])
        },
        {
            keywords: ["uv", "ultraviolet", "opti-vu", "uv laser"],
            handler: () => formatProduct(KB.products["uv lasers"])
        },
        {
            keywords: ["cij", "continuous inkjet", "continuous ink", "3260", "300 series"],
            handler: () => `**🖨️ Continuous Inkjet (CIJ) Printers:**\n\nTechBott India offers world-class **Leibinger** and **300 Series (Model: 3260)** CIJ printers:\n\n• **Model 3260** – 10.1" touch screen, 2-20mm print height, IP55.\n• **Jet 2neo** – Prints up to 3 lines at 268 m/min with Sealtronic.\n• **Jet 3Eco** – High-performance with expanded character sets.\n\nAsk me about a specific model for more details!\n\n[View CIJ Products →](${basePath}pages/technology/Continuous-Inkjet-(CIJ)-printers.html)`
        },
        {
            keywords: ["tij", "thermal inkjet", "thermal ink jet"],
            handler: () => formatProduct(KB.products["tij printers"])
        },
        {
            keywords: ["dod", "drop on demand", "drop-on-demand"],
            handler: () => formatProduct(KB.products["dod printers"])
        },
        {
            keywords: ["pij", "piezo", "piezoelectric", "hi-res", "tb series", "8 series"],
            handler: () => formatProduct(KB.products["pij printers"])
        },
        {
            keywords: ["tto", "thermal transfer over", "linx tt", "linx"],
            handler: () => formatProduct(KB.products["tto printers"])
        },
        {
            keywords: ["ribbon", "thermal transfer ribbon", "wax", "resin"],
            handler: () => formatProduct(KB.products["thermal transfer ribbon"])
        },
        {
            keywords: ["megalo", "hx-megalo", "hx megalo"],
            handler: () => formatProduct(KB.products["hx megalo"])
        },
        {
            keywords: ["ultro", "hx ultro tij"],
            handler: (q) => {
                if (q.includes("ctij")) return formatProduct(KB.products["ultro ctij"]);
                return formatProduct(KB.products["hx ultro"]);
            }
        },
        {
            keywords: ["nitro", "hx-nitro", "hx nitro"],
            handler: (q) => {
                return formatProduct(KB.products["hx nitro"]);
            }
        },
        {
            keywords: ["cartro", "hx-cartro", "hx cartro", "carto"],
            handler: () => formatProduct(KB.products["hx cartro"])
        },
        {
            keywords: ["jet 2", "jet2", "neo", "jet-2neo", "jet 2 neo", "jet 2neo"],
            handler: () => formatProduct(KB.products["leibinger jet2neo"])
        },
        {
            keywords: ["jet 3", "jet3", "eco", "jet-3eco", "jet 3 eco", "jet 3eco"],
            handler: () => formatProduct(KB.products["jet 3 eco"])
        },
        {
            keywords: ["sealtronic"],
            handler: () => `**Sealtronic Technology:**\n\nLeibinger's patented automated nozzle seal technology ensures zero downtime and zero clogging. No print head cleaning is required daily, and it offers instant start-up even after long shutdown periods.\n\nFeatured in our **Jet 2neo** and **Jet 3Eco** CIJ printers!\n\n[View Leibinger Products →](${basePath}pages/technology/Leibinger.html)`
        },
        {
            keywords: ["accessories", "spare parts", "spares", "consumables", "parts", "nozzle", "ink cartridge", "filter"],
            handler: () => formatProduct(KB.products["accessories"])
        },
        {
            keywords: ["laser", "lasers", "laser system", "marking laser"],
            handler: () => `**⚡ Laser Systems at TechBott India:**\n\n**1. CO2 Lasers** – Opti-Co2 (30W)\n**2. Fiber Lasers** – OptiFy (20W/30W/50W/100W)\n**3. UV Lasers** – Opti-Vu (3W/5W/10W)\n\n[View products →](${basePath}pages/general/Products.html)`
        },
        {
            keywords: ["printer", "printers", "inkjet", "printing machine"],
            handler: () => `**🖨️ Inkjet Printers at TechBott India:**\n\n**1. CIJ** – Continuous Inkjet\n**2. TIJ** – Thermal Inkjet\n**3. DOD** – Drop on Demand\n**4. PIJ** – Hi-Res Piezo Inkjet\n**5. TTO** – Thermal Transfer Over\n\n[View products →](${basePath}pages/general/Products.html)`
        }
    ];

    const generalIntents = [
        {
            keywords: ["request quotation", "request a quotation", "get a quote", "quotation"],
            handler: () => `**Request a Quotation**\n\nTo get a customized quote for your requirements, please contact our Sales team:\n📧 Email: ${KB.contact.email.general}\n📱 Phone/WhatsApp: ${KB.contact.whatsapp}\n\nOr visit our [Contact Page](${basePath}pages/general/contact.html).`
        },
        {
            keywords: ["talk to sales", "sales team", "sales"],
            handler: () => `**Talk to Sales**\n\nOur sales experts are ready to assist you:\n📱 Phone: ${KB.contact.phone.join(" | ")}
📧 Email: ${KB.contact.email.general}\n\n[Contact us →](${basePath}pages/general/contact.html)`
        },
        {
            keywords: ["service support", "technical support", "contact technical support", "maintenance"],
            handler: () => `**Service & Technical Support**\n\nTechBott India provides 24/7 supply and service availability.\n📱 Call Support: +91 9502677315\n📧 Email: ${KB.contact.email.general}\n\n[Contact Support →](${basePath}pages/general/contact.html)`
        },
        {
            keywords: ["product brochure", "brochure", "catalog", "catalogue", "brochures"],
            handler: () => `**Product Brochures**\n\nYou can download technical brochures and product specifications directly from our brochures page.\n\n[View Brochures →](${basePath}pages/general/brochures.html)`
        },
        {
            keywords: ["schedule a product demo", "schedule a demo", "product demo", "demo"],
            handler: () => `**Schedule a Product Demo**\n\nWe would love to show you our products in action! Please reach out to us to schedule a live demonstration.\n📱 Phone: ${KB.contact.phone[0]}\n📧 Email: ${KB.contact.email.general}\n\n[Contact us →](${basePath}pages/general/contact.html)`
        },
        {
            keywords: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening", "namaste", "howdy"],
            handler: () => "Hello! I'm **Mavya**, your TechBott India assistant. 👋\n\nI can help you with:\n• Our **products**\n• **Contact** information\n• **Industries** we serve\n• **Product Recommendations**\n\nWhat would you like to know?"
        }
    ];

    function formatProduct(p) {
        if (!p) return "I couldn't find that specific product. Try asking about our product categories!";
        let msg = `**${p.name}**\n\n`;
        if (p.models) msg += `📋 **Models:** ${p.models}\n\n`;
        if (p.features) msg += `⚙️ **Features:** ${p.features}\n\n`;
        if (p.applications) msg += `🎯 **Applications:** ${p.applications}\n\n`;
        if (p.materials) msg += `🧱 **Printable Materials:** ${p.materials}\n\n`;
        if (p.printContent) msg += `🖋️ **Print Content:** ${p.printContent}\n\n`;
        if (p.page) msg += `[Learn more →](${basePath}${p.page})`;
        return msg;
    }

    // ─── Chat Response (no longer handles recommendation - that's in the overlay) ───
    function getResponse(userMsg) {
        const q = userMsg.toLowerCase().trim();
        if (!q) return "Please type a question.";

        // If someone types "recommend" in the chat, open the overlay instead
        if (q === "product recommendation assistant" || q === "product recommendations" || q === "product recommendation" || q === "recommend me a printer" || q === "recommend" || q === "ai product recommendation" || q === "✨ ai product recommendation") {
            setTimeout(() => openOverlay(), 100);
            return "Opening the **AI Product Recommendation Assistant** for you! 🤖";
        }

        for (const intent of productIntents) {
            for (const kw of intent.keywords) {
                if (q.includes(kw)) return intent.handler(q);
            }
        }
        for (const intent of generalIntents) {
            for (const kw of intent.keywords) {
                if (q.includes(kw)) return intent.handler(q);
            }
        }
        for (const key of Object.keys(KB.products)) {
            const words = key.split(" ");
            if (words.some(w => w.length > 2 && new RegExp(`\\b${w}\\b`).test(q))) {
                return formatProduct(KB.products[key]);
            }
        }

        return `I'm sorry, I couldn't understand that.\n\nTry using the quick options below or click **✨ AI Product Recommendation** for our guided assistant!`;
    }

    // ─── Simple Markdown Renderer ───
    function renderMarkdown(text) {
        let html = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="mavya-link">$1</a>')
            .replace(/^• (.+)$/gm, '<li>$1</li>')
            .replace(/^✅ (.+)$/gm, '<li class="mavya-check">$1</li>')
            .replace(/\n\n/g, '<br><br>')
            .replace(/\n/g, '<br>');

        html = html.replace(/((?:<li[^>]*>.*?<\/li><br>?)+)/g, function (match) {
            return '<ul class="mavya-list">' + match.replace(/<br>/g, '') + '</ul>';
        });
        return html;
    }

    // ═══════════════════════════════════════════════════════════════
    //  AI RECOMMENDATION OVERLAY — Full-Screen Wizard
    // ═══════════════════════════════════════════════════════════════

    const REC_QUESTIONS = [
        {
            label: "Question 1 of 5",
            q: "Which industry are you from?",
            icon: "🏭",
            opts: [
                { text: "Pharmaceuticals", icon: "💊" },
                { text: "Food & Beverage", icon: "🍔" },
                { text: "Cosmetics & Personal Care", icon: "💄" },
                { text: "Industrial & Manufacturing", icon: "⚙️" },
                { text: "Automotive", icon: "🚗" },
                { text: "Electronics", icon: "💻" },
                { text: "Packaging & Logistics", icon: "📦" },
                { text: "Other", icon: "📝", isOther: true }
            ]
        },
        {
            label: "Question 2 of 5",
            q: "Can you explain your application?",
            icon: "🎯",
            opts: [
                { text: "Batch Codes / Expiry Dates", icon: "📅" },
                { text: "Barcodes / QR Codes", icon: "📱" },
                { text: "Logos & Graphics", icon: "🎨" },
                { text: "Outer Case / Carton Coding", icon: "📦" },
                { text: "Serialization / Track & Trace", icon: "🔍" },
                { text: "Anti-counterfeiting", icon: "🛡️" },
                { text: "Other", icon: "📝", isOther: true }
            ]
        },
        {
            label: "Question 3 of 5",
            q: "What material do you want to print on?",
            icon: "🧱",
            opts: [
                { text: "Plastics & PET Bottles", icon: "🧴" },
                { text: "Carton & Paper", icon: "📄" },
                { text: "Glass & Ceramics", icon: "🥛" },
                { text: "Metal & Aluminum", icon: "🔩" },
                { text: "Flexible Film / Foil", icon: "🎞️" },
                { text: "Wood", icon: "🪵" },
                { text: "Cables & Wires", icon: "🔌" },
                { text: "Other", icon: "📝", isOther: true }
            ]
        },
        {
            label: "Question 4 of 5",
            q: "What production speed do you require?",
            icon: "⚡",
            opts: [
                { text: "Low / Manual Operation", icon: "🐢" },
                { text: "Medium (up to 50 m/min)", icon: "🚶" },
                { text: "High (50–150 m/min)", icon: "🏃" },
                { text: "Very High (150–240+ m/min)", icon: "🚀" },
                { text: "Other", icon: "📝", isOther: true }
            ]
        },
        {
            label: "Question 5 of 5",
            q: "What print size (height) is required?",
            icon: "📏",
            opts: [
                { text: "Small (up to 12.7mm)", icon: "🔬" },
                { text: "Medium (12.7–25.4mm)", icon: "📐" },
                { text: "Large (25.4–50mm)", icon: "📏" },
                { text: "Extra Large (50mm+)", icon: "🖼️" },
                { text: "Other", icon: "📝", isOther: true }
            ]
        }
    ];

    let overlayElement = null;
    let overlayCurrentQ = 0;
    let overlayAnswers = {};
    let showOtherInput = false;

    function buildOverlayHTML() {
        const div = document.createElement('div');
        div.className = 'mavya-overlay';
        div.id = 'mavya-overlay';
        div.innerHTML = `
            <div class="mavya-overlay-card">
                <button class="mavya-overlay-close" id="mavya-overlay-close" title="Close">✕</button>
                <div class="mavya-overlay-header">
                    <div class="mavya-overlay-header-content">
                        <div class="mavya-overlay-brand">
                            <div class="mavya-overlay-brand-icon">🤖</div>
                            <div class="mavya-overlay-title">AI Product Recommendation</div>
                        </div>
                        <div class="mavya-overlay-subtitle">Answer 5 quick questions and we'll recommend the perfect industrial printer for your needs.</div>
                    </div>
                    <div class="mavya-progress-bar" id="mavya-progress-bar"></div>
                </div>
                <div class="mavya-overlay-body" id="mavya-overlay-body"></div>
                <div class="mavya-overlay-footer" id="mavya-overlay-footer"></div>
            </div>
        `;
        document.body.appendChild(div);
        overlayElement = div;

        // Close button
        document.getElementById('mavya-overlay-close').addEventListener('click', closeOverlay);

        // Click outside card to close
        div.addEventListener('click', function(e) {
            if (e.target === div) closeOverlay();
        });

        // ESC key to close
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && overlayElement && overlayElement.classList.contains('mavya-overlay-open')) {
                closeOverlay();
            }
        });
    }

    function openOverlay() {
        if (!overlayElement) buildOverlayHTML();
        overlayCurrentQ = 0;
        overlayAnswers = {};
        showOtherInput = false;
        overlayElement.classList.add('mavya-overlay-open');
        document.body.style.overflow = 'hidden';
        renderOverlayStep();
    }

    function closeOverlay() {
        if (overlayElement) {
            overlayElement.classList.remove('mavya-overlay-open');
            document.body.style.overflow = '';
        }
    }

    function renderProgressBar() {
        const bar = document.getElementById('mavya-progress-bar');
        if (!bar) return;
        let html = '';
        for (let i = 0; i < REC_QUESTIONS.length; i++) {
            let cls = '';
            if (i < overlayCurrentQ) cls = 'completed';
            else if (i === overlayCurrentQ) cls = 'active';
            html += `<div class="mavya-progress-step ${cls}">`;
            html += `<div class="mavya-progress-dot">${i < overlayCurrentQ ? '✓' : (i + 1)}</div>`;
            if (i < REC_QUESTIONS.length - 1) {
                html += `<div class="mavya-progress-line"></div>`;
            }
            html += `</div>`;
        }
        bar.innerHTML = html;
    }

    function renderOverlayStep() {
        renderProgressBar();
        const body = document.getElementById('mavya-overlay-body');
        const footer = document.getElementById('mavya-overlay-footer');

        if (overlayCurrentQ >= REC_QUESTIONS.length) {
            // Show results
            renderOverlayResults(body);
            footer.innerHTML = '';
            footer.style.display = 'none';
            return;
        }

        footer.style.display = '';
        const qObj = REC_QUESTIONS[overlayCurrentQ];
        let optsHtml = '';
        qObj.opts.forEach((opt) => {
            if (opt.isOther) {
                optsHtml += `
                    <button class="mavya-overlay-option" data-other="true">
                        <div class="mavya-overlay-option-text">${opt.text} (Type your answer)</div>
                    </button>`;
            } else {
                optsHtml += `
                    <button class="mavya-overlay-option" data-answer="${opt.text}">
                        <div class="mavya-overlay-option-text">${opt.text}</div>
                    </button>`;
            }
        });

        body.innerHTML = `
            <div class="mavya-question-container" key="${overlayCurrentQ}">
                <div class="mavya-question-label">${qObj.label}</div>
                <div class="mavya-question-text">${qObj.q}</div>
                <div class="mavya-overlay-options">${optsHtml}</div>
                <div id="mavya-other-input-area"></div>
            </div>
        `;

        // Footer nav
        footer.innerHTML = `
            <button class="mavya-overlay-nav-btn mavya-overlay-btn-back" id="mavya-btn-back" ${overlayCurrentQ === 0 ? 'disabled' : ''}>
                ← Back
            </button>
            <div class="mavya-overlay-step-info">Step ${overlayCurrentQ + 1} of ${REC_QUESTIONS.length}</div>
            <button class="mavya-overlay-nav-btn mavya-overlay-btn-skip" id="mavya-btn-skip">
                Skip →
            </button>
        `;

        // Bind option clicks
        body.querySelectorAll('.mavya-overlay-option').forEach(btn => {
            btn.addEventListener('click', function() {
                if (this.dataset.other === 'true') {
                    showOtherInputField();
                } else {
                    selectAnswer(this.dataset.answer);
                }
            });
        });

        // Back button
        document.getElementById('mavya-btn-back').addEventListener('click', function() {
            if (overlayCurrentQ > 0) {
                overlayCurrentQ--;
                renderOverlayStep();
            }
        });

        // Skip button
        document.getElementById('mavya-btn-skip').addEventListener('click', function() {
            selectAnswer('Not specified');
        });

        // Scroll body to top
        body.scrollTop = 0;
    }

    function showOtherInputField() {
        const area = document.getElementById('mavya-other-input-area');
        if (!area || area.querySelector('.mavya-overlay-other-input')) return;
        area.innerHTML = `
            <div class="mavya-overlay-other-input">
                <input type="text" id="mavya-other-text" placeholder="Type your answer..." maxlength="200" autofocus />
                <button id="mavya-other-submit">Submit</button>
            </div>
        `;
        const input = document.getElementById('mavya-other-text');
        const submitBtn = document.getElementById('mavya-other-submit');
        input.focus();
        submitBtn.addEventListener('click', function() {
            const val = input.value.trim();
            if (val) selectAnswer(val);
        });
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const val = input.value.trim();
                if (val) selectAnswer(val);
            }
        });
    }

    function selectAnswer(answer) {
        const keys = ["industry", "application", "material", "speed", "size"];
        overlayAnswers[keys[overlayCurrentQ]] = answer.toLowerCase();
        overlayCurrentQ++;
        renderOverlayStep();
    }

    // ─── Enhanced Recommendation Engine ───
    function generateOverlayRecommendation() {
        const prefs = overlayAnswers;
        let matchedProducts = [];
        let scores = {};

        // Helper: add product with a score
        function addScore(key, points) {
            if (!KB.products[key]) return;
            scores[key] = (scores[key] || 0) + points;
        }

        // Material-based scoring
        const mat = prefs.material || '';
        if (mat.includes('glass') || mat.includes('ceramic')) {
            addScore('co2 lasers', 3);
            addScore('cij printers', 2);
        }
        if (mat.includes('metal') || mat.includes('aluminum')) {
            addScore('fiber lasers', 4);
            addScore('cij printers', 2);
        }
        if (mat.includes('plastic') || mat.includes('pet')) {
            addScore('tij printers', 3);
            addScore('hx ultro', 3);
            addScore('hx nitro', 2);
            addScore('cij printers', 2);
        }
        if (mat.includes('carton') || mat.includes('paper')) {
            addScore('tij printers', 3);
            addScore('hx megalo', 3);
            addScore('hx cartro', 2);
            addScore('dod printers', 2);
        }
        if (mat.includes('film') || mat.includes('foil') || mat.includes('flexible')) {
            addScore('tto printers', 4);
            addScore('hx nitro', 2);
            addScore('tij printers', 2);
        }
        if (mat.includes('wood')) {
            addScore('dod printers', 3);
            addScore('co2 lasers', 2);
            addScore('pij printers', 2);
        }
        if (mat.includes('cable') || mat.includes('wire')) {
            addScore('cij printers', 4);
            addScore('pij printers', 2);
        }

        // Size-based scoring
        const sz = prefs.size || '';
        if (sz.includes('extra large') || sz.includes('50mm')) {
            addScore('dod printers', 4);
            addScore('hx megalo', 3);
            addScore('pij printers', 2);
        } else if (sz.includes('large') || sz.includes('25.4')) {
            addScore('hx megalo', 3);
            addScore('pij printers', 2);
            addScore('dod printers', 2);
        } else if (sz.includes('medium') || sz.includes('12.7')) {
            addScore('tij printers', 2);
            addScore('hx ultro', 2);
            addScore('hx cartro', 2);
        } else if (sz.includes('small')) {
            addScore('tij printers', 3);
            addScore('hx nitro', 3);
            addScore('cij printers', 2);
        }

        // Speed-based scoring
        const spd = prefs.speed || '';
        if (spd.includes('very high') || spd.includes('240') || spd.includes('150')) {
            addScore('pij printers', 3);
            addScore('hx nitro', 2);
            addScore('tij printers', 2);
            addScore('jet 3 eco', 3);
        } else if (spd.includes('high') || spd.includes('50')) {
            addScore('cij printers', 2);
            addScore('leibinger jet2neo', 2);
            addScore('tij printers', 2);
        } else if (spd.includes('medium')) {
            addScore('tij printers', 2);
            addScore('tto printers', 2);
        } else if (spd.includes('low') || spd.includes('manual')) {
            addScore('co2 lasers', 2);
            addScore('fiber lasers', 2);
            addScore('uv lasers', 2);
        }

        // Application-based scoring
        const app = prefs.application || '';
        if (app.includes('batch') || app.includes('expiry') || app.includes('date')) {
            addScore('cij printers', 2);
            addScore('tij printers', 2);
            addScore('hx nitro', 1);
        }
        if (app.includes('barcode') || app.includes('qr')) {
            addScore('tij printers', 3);
            addScore('hx ultro', 2);
            addScore('hx cartro', 2);
        }
        if (app.includes('logo') || app.includes('graphic')) {
            addScore('pij printers', 3);
            addScore('hx megalo', 2);
            addScore('fiber lasers', 2);
        }
        if (app.includes('outer case') || app.includes('carton')) {
            addScore('hx megalo', 4);
            addScore('dod printers', 3);
        }
        if (app.includes('serial') || app.includes('track')) {
            addScore('tij printers', 3);
            addScore('fiber lasers', 2);
        }
        if (app.includes('anti-counterfeit') || app.includes('counterfeit')) {
            addScore('uv lasers', 3);
            addScore('tij printers', 2);
        }

        // Industry-based scoring
        const ind = prefs.industry || '';
        if (ind.includes('pharma')) {
            addScore('tij printers', 2);
            addScore('hx ultro', 1);
            addScore('co2 lasers', 1);
        }
        if (ind.includes('food') || ind.includes('beverage')) {
            addScore('cij printers', 2);
            addScore('tto printers', 2);
            addScore('leibinger jet2neo', 1);
        }
        if (ind.includes('cosmetic') || ind.includes('personal')) {
            addScore('tij printers', 2);
            addScore('uv lasers', 1);
        }
        if (ind.includes('automotive')) {
            addScore('fiber lasers', 2);
            addScore('pij printers', 1);
        }
        if (ind.includes('electronic')) {
            addScore('uv lasers', 2);
            addScore('fiber lasers', 2);
        }

        // Fallback if nothing matched (e.g. user skipped everything)
        if (matchedProducts.length === 0) {
            // Recommend all products, TechBott first
            Object.values(KB.products).forEach(p => {
                if (p.name !== "Accessories & Spare Parts") {
                    matchedProducts.push(p);
                }
            });
            // Sort so TechBott is first
            matchedProducts.sort((a, b) => {
                if (a.brand === 'TechBott' && b.brand !== 'TechBott') return -1;
                if (a.brand !== 'TechBott' && b.brand === 'TechBott') return 1;
                return 0;
            });
            return matchedProducts;
        }

        return matchedProducts;
    }

    function renderOverlayResults(body) {
        const products = generateOverlayRecommendation();

        // Update progress bar to all completed
        const bar = document.getElementById('mavya-progress-bar');
        if (bar) {
            let html = '';
            for (let i = 0; i < REC_QUESTIONS.length; i++) {
                html += `<div class="mavya-progress-step completed">`;
                html += `<div class="mavya-progress-dot">✓</div>`;
                if (i < REC_QUESTIONS.length - 1) {
                    html += `<div class="mavya-progress-line"></div>`;
                }
                html += `</div>`;
            }
            bar.innerHTML = html;
        }

        // Setup global function for brochure download if it doesn't exist
        if (!window.mavyaDownloadBrochure) {
            window.mavyaDownloadBrochure = function(productName, pdfPath) {
                const email = prompt(`Please enter your email ID to download the brochure for ${productName}:`);
                if (email && email.trim() !== '') {
                    // 1. Send notification to marketing silently via backend API
                    const API_BASE = window.TECHBOTT_API_URL || 'http://localhost:3000';
                    const enquiryData = {
                        firstName: 'Brochure',
                        surname: 'Download',
                        email: email.trim(),
                        company: 'Not Provided',
                        mobile: 'Not Provided',
                        city: 'Not Provided',
                        state: 'Not Provided',
                        comments: `Brochure downloaded via AI Assistant`,
                        productName: productName,
                        optIn: true,
                        sendTo: 'marketing@techbottindia.com'
                    };

                    fetch(API_BASE + '/api/enquiry', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(enquiryData)
                    })
                    .then(response => response.json())
                    .then(data => console.log('[TechBott] Backend notified of brochure download'))
                    .catch(err => console.error('[TechBott] Failed to notify backend:', err));
                    
                    // 2. Trigger download directly
                    if (pdfPath && pdfPath !== 'undefined' && pdfPath !== '') {
                        const link = document.createElement('a');
                        link.href = basePath + pdfPath;
                        link.download = pdfPath.split('/').pop();
                        link.target = '_blank';
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                        
                        alert(`Thank you! The brochure for ${productName} is downloading.`);
                    } else {
                        alert(`Thank you! The brochure for ${productName} will be sent to your email by our marketing team shortly.`);
                    }
                }
            };
        }

        let cardsHtml = '';
        products.forEach((p, idx) => {
            const badges = ['Best Match', 'Recommended', 'Also Consider'];
            const allSkipped = Object.values(overlayAnswers).every(val => val === 'Not specified');
            const badgeText = (!allSkipped) ? (badges[idx] || 'Option') : (p.brand === 'TechBott' ? 'Highly Recommended' : 'Option');
            
            const quotationLink = `${basePath}pages/general/contact.html?product=${encodeURIComponent(p.name)}`;
            
            cardsHtml += `
                <div class="mavya-product-card">
                    <div class="mavya-product-card-badge">${badgeText}</div>
                    <h3>${p.name}${p.brand ? ' <span style="font-weight:400;font-size:13px;color:#6b7280;">by ' + p.brand + '</span>' : ''}</h3>
                    ${p.models ? '<div class="mavya-product-card-features"><strong>Models:</strong> ' + p.models + '</div>' : ''}
                    <div class="mavya-product-card-features">${p.features || ''}</div>
                    ${p.applications ? '<div class="mavya-product-card-features"><strong>Applications:</strong> ' + p.applications + '</div>' : ''}
                    
                    <div class="mavya-product-card-actions" style="margin-top: 15px; display: flex; flex-wrap: wrap; gap: 8px;">
                        <a href="${quotationLink}" class="mavya-next-step-btn" style="flex: 1; padding: 8px; font-size: 13px;">
                            Quote
                        </a>
                        ${p.pdf ? `<button onclick="window.mavyaDownloadBrochure('${p.name.replace(/'/g, "\\'")}', '${p.pdf}')" class="mavya-next-step-btn" style="flex: 1; padding: 8px; font-size: 13px; border: 1px solid var(--mavya-border); background: #f8fafc; cursor: pointer;">
                            Brochure
                        </button>` : ''}
                        ${p.page ? `<a href="${basePath}${p.page}" class="mavya-next-step-btn" style="flex: 1; padding: 8px; font-size: 13px;">
                            Specs/Videos
                        </a>` : ''}
                    </div>
                </div>`;
        });

        body.innerHTML = `
            <div class="mavya-results-container">
                <div class="mavya-results-header">
                    <h2>Your Recommended Solutions</h2>
                    <p>Based on your requirements, here are the best-fit industrial printers.</p>
                </div>

                <div class="mavya-product-cards">
                    ${cardsHtml}
                </div>

                <button class="mavya-restart-btn" id="mavya-restart-btn">
                    🔄 Start Over
                </button>
            </div>
        `;

        // Restart
        document.getElementById('mavya-restart-btn').addEventListener('click', function() {
            overlayCurrentQ = 0;
            overlayAnswers = {};
            renderOverlayStep();
        });

        body.scrollTop = 0;
    }


    // ═══════════════════════════════════════════════════════════════
    //  CHAT WIDGET UI — Build & Events
    // ═══════════════════════════════════════════════════════════════

    function buildUI() {
        // Toggle Button
        const toggleBtn = document.createElement('div');
        toggleBtn.id = 'mavya-toggle';
        toggleBtn.innerHTML = `
            <div class="mavya-toggle-btn" title="Chat with Mavya">
                <svg class="mavya-icon-chat" viewBox="0 0 24 24" width="28" height="28" fill="white">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
                </svg>
                <svg class="mavya-icon-close" viewBox="0 0 24 24" width="28" height="28" fill="white" style="display:none">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
            </div>`;
        document.body.appendChild(toggleBtn);

        // Chat Window
        const chatWindow = document.createElement('div');
        chatWindow.id = 'mavya-chat';
        chatWindow.innerHTML = `
            <div class="mavya-header">
                <button class="mavya-back-btn" title="Close chat">✕</button>
                <img class="mavya-avatar" src="${basePath}img/chatbotlogo.jpeg" alt="TechBott India" style="object-fit: cover; pointer-events: none; user-select: none; -webkit-user-drag: none;" oncontextmenu="return false;" draggable="false">
                <div class="mavya-header-info">
                    <span>Mavya</span>
                    <span>TechBott India Assistant</span>
                </div>
            </div>
            <div class="mavya-body" id="mavya-body">
                <div class="mavya-msg mavya-msg-bot">
                    <div class="mavya-sender-name">Mavya</div>
                    <div class="mavya-bubble">
                        👋 Welcome to <strong>TechBott India!</strong> How can I help you today?
                        <div class="mavya-options">
                            <button class="mavya-option-btn" data-q="✨ AI Product Recommendation">✨ AI Product Recommendation</button>
                            <button class="mavya-option-btn" data-q="Request a Quotation">📝 Request a Quotation</button>
                            <button class="mavya-option-btn" data-q="Talk to Sales">📞 Talk to Sales</button>
                            <button class="mavya-option-btn" data-q="Service Support">🛠️ Service Support</button>
                            <button class="mavya-option-btn" data-q="Product Brochure">📄 Product Brochure</button>
                            <button class="mavya-option-btn" data-q="Schedule a Product Demo">📅 Schedule a Product Demo</button>
                            <button class="mavya-option-btn" data-q="Contact Technical Support">🔧 Contact Technical Support</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mavya-footer">
                <form id="mavya-form" autocomplete="off">
                    <input type="text" id="mavya-input" placeholder="Type a message..." maxlength="300" autocomplete="off">
                    <button type="submit" id="mavya-send" title="Send">
                        <svg viewBox="0 0 24 24" fill="white"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
                    </button>
                </form>
            </div>`;
        document.body.appendChild(chatWindow);

        // DOM references
        const toggle = toggleBtn.querySelector('.mavya-toggle-btn');
        const closeBtn = chatWindow.querySelector('.mavya-back-btn');
        const form = document.getElementById('mavya-form');
        const input = document.getElementById('mavya-input');
        const body = document.getElementById('mavya-body');
        const iconChat = toggleBtn.querySelector('.mavya-icon-chat');
        const iconClose = toggleBtn.querySelector('.mavya-icon-close');

        let isOpen = false;

        function toggleChat() {
            isOpen = !isOpen;
            chatWindow.classList.toggle('mavya-open', isOpen);
            toggleBtn.classList.toggle('mavya-active', isOpen);
            iconChat.style.display = isOpen ? 'none' : 'block';
            iconClose.style.display = isOpen ? 'block' : 'none';
            if (isOpen) input.focus();
        }

        toggle.addEventListener('click', toggleChat);
        closeBtn.addEventListener('click', toggleChat);

        function getTimeString() {
            const now = new Date();
            let hours = now.getHours();
            let minutes = now.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12;
            minutes = minutes < 10 ? '0' + minutes : minutes;
            return hours + ':' + minutes + ' ' + ampm;
        }

        function addMessage(text, sender) {
            const msgDiv = document.createElement('div');
            msgDiv.className = `mavya-msg mavya-msg-${sender}`;

            const nameDiv = document.createElement('div');
            nameDiv.className = 'mavya-sender-name';
            nameDiv.textContent = sender === 'bot' ? 'Mavya' : 'You';
            msgDiv.appendChild(nameDiv);

            const bubble = document.createElement('div');
            bubble.className = 'mavya-bubble';
            bubble.innerHTML = sender === 'bot' ? renderMarkdown(text) : escapeHtml(text);
            msgDiv.appendChild(bubble);

            const timeDiv = document.createElement('div');
            timeDiv.className = 'mavya-msg-time';
            timeDiv.textContent = getTimeString();
            msgDiv.appendChild(timeDiv);

            body.appendChild(msgDiv);
            body.scrollTop = body.scrollHeight;
        }

        function showTyping() {
            const typing = document.createElement('div');
            typing.className = 'mavya-msg mavya-msg-bot';
            typing.innerHTML = '<div class="mavya-sender-name">Mavya</div><div class="mavya-bubble"><div class="mavya-typing"><span></span><span></span><span></span></div></div>';
            body.appendChild(typing);
            body.scrollTop = body.scrollHeight;
            return typing;
        }

        function escapeHtml(text) {
            const d = document.createElement('div');
            d.textContent = text;
            return d.innerHTML;
        }

        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const msg = input.value.trim();
            if (!msg) return;
            addMessage(msg, 'user');
            input.value = '';

            const typingEl = showTyping();
            setTimeout(() => {
                typingEl.remove();
                const reply = getResponse(msg);
                addMessage(reply, 'bot');
            }, 600 + Math.random() * 400);
        });

        // Event delegation for option buttons
        chatWindow.addEventListener('click', function(e) {
            if (e.target.classList.contains('mavya-option-btn')) {
                const q = e.target.getAttribute('data-q');
                if (q) {
                    // If it's the AI recommendation, open overlay directly
                    if (q === '✨ AI Product Recommendation') {
                        addMessage(q, 'user');
                        const typingEl = showTyping();
                        setTimeout(() => {
                            typingEl.remove();
                            addMessage("Opening the **AI Product Recommendation Assistant** for you! 🤖", 'bot');
                            openOverlay();
                        }, 400);
                    } else {
                        addMessage(q, 'user');
                        const typingEl = showTyping();
                        setTimeout(() => {
                            typingEl.remove();
                            addMessage(getResponse(q), 'bot');
                        }, 500);
                    }
                }
            }
        });

        // Auto-open Chatbot widget on Home Page after 1.5 seconds (every time)
        setTimeout(() => {
            const isHome = window.location.pathname === '/' || window.location.pathname.toLowerCase().endsWith('index.html') || window.location.pathname.endsWith('/');
            if (isHome) {
                if (!isOpen) toggleChat();
            }
        }, 1500);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', buildUI);
    } else {
        buildUI();
    }
})();
