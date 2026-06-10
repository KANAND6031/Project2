function extractSection(text) {

    const sectionPatterns = [

        "Document Control",
        "Executive Summary",
        "Operational Philosophy",
        "Facility Classifications",
        "Governance & Auditing",

        "Inbound Operations",
        "Trailer Docking",
        "Unloading & Decanting",
        "Product Preparation",
        "Stow Operations",

        "Inventory Audit Framework",
        "Simple Bin Count",
        "Cycle Count",
        "Damaged Inventory",
        "Bin Consolidation",

        "Outbound Operations",
        "Picking Strategies",
        "Pack Operations",
        "SLAM Operations",
        "Ship Dock Logistics",

        "Delivery Station",
        "Route Planning",
        "Driver Load-Out",
        "Delivery Protocols",

        "Customer Service",
        "Ticket Lifecycle",
        "Refunds & Returns",
        "Fraud Prevention",

        "Safety",
        "PPE",
        "Shift Handover",

        "Business Continuity",
        "Evacuation",
        "WMS Outages",
        "Hazmat Response",
        "Extreme Weather"
    ];

    for (
        const section of
        sectionPatterns
    ) {

        if (
            text.includes(
                section
            )
        ) {

            return section;
        }
    }

    return "Unknown Section";
}

module.exports =
extractSection;