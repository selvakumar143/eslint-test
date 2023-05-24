export const Mail_Vars = {
    sitename: "Mira",
    contact_email: "sales@petergreatorex.co.uk",
    company_phone: "01225 904999",
    available_time: "9.00 am - 5.30 pm Monday - Friday",
    available_days: "9.30 am - 1.30 pm Saturday",
    address: "Queen Street, Bath, BA1 1HE",
    primary_color: "#BFBBAC",
    enquiry: '/contact/general-enquiry/',
    valuation: '/property-valuation/'
}

export const Site_Vars = {
    default_currency: "£"
}

export const getWhatsAppURL = number => {
    if (!number) return null
    // remove everything except numbers
    const formatedNumber = number?.replace(/\D/g, "")
    return `https://api.whatsapp.com/send?phone=${formatedNumber}`
}