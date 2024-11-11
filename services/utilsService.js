import moment from "moment";
export function covertToCurrency(Amount = 0, withsymbol=true,baseCurrency="AED", toCurrency="AED") {
  if (typeof parseFloat(Amount) != "number" || Amount == undefined || Amount == NaN) {
    Amount = 0;
    
    return new Intl.NumberFormat("AED", {
      style: "currency",
      roundingMode: "ceil",
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
      currency: toCurrency
    }).format(Amount);
  } else {
    
    if(withsymbol==false){
      return new Intl.NumberFormat("AED", {
        // style: "currency",
        roundingMode: "ceil",
        maximumFractionDigits: 0,
        minimumFractionDigits: 0,
        currency: toCurrency
      }).format(Amount);
    }else{
    return new Intl.NumberFormat("AED", {
      style: "currency",
      roundingMode: "ceil",
      maximumFractionDigits: 0,
      minimumFractionDigits: 0,
      currency: toCurrency
    }).format(Amount);
  }
  }


}
export function covertToMIllion(Amount = 0, withsymbol=true,baseCurrency="AED", toCurrency="AED") {
  if (typeof parseFloat(Amount) != "number" || Amount == undefined || Amount == NaN) {
    Amount = 0;
    
    return new Intl.NumberFormat("AED", {
      style: "currency",
      maximumFractionDigits: 2,
      roundingMode: "ceil",
      maximumFractionDigits: 2,
      currency: toCurrency
    }).format(Amount);
  } else {
    
    if(withsymbol==false){
      return new Intl.NumberFormat("AED", {
        // style: "currency",
        maximumFractionDigits: 2,
        maximumFractionDigits: 2,
        currency: toCurrency
      }).format(Amount);
    }else{
    const truncatedAmount = Math.trunc(Amount * 100) / 100;

    return new Intl.NumberFormat("AED", {
      style: "currency",
      maximumFractionDigits: 2,
      maximumFractionDigits: 2,
      currency: toCurrency
    }).format(truncatedAmount);
  }
  }


}
export function getDateFromToday(days) {
  const day = moment().add(days, "days");
  return day
}
export function businessType(type) {
  if (type == "Sale") {
    return {
      websiteType: "Sales",
      websiteText: "Sale",
    };
  } else {
    return {
      websiteType: "Lettings",
      websiteText: "Rent",
    };
  }
}
export function getYoutubeURL(url, settings) {

  var url = new URL(url);
  var id = url.searchParams.get("v");
  if (id == null) {
    id = url.pathname.substring(1);
  }
  return "https://www.youtube.com/embed/" + id + settings;
}
export function whatsappLink(agentContact, url) {
  return "https://wa.me/" + agentContact + "?text=%0AHi%20There%2C%0A%0AI%20am%20interested%20in%20 " + url + "%20this%20listing%20from%20your%20website.%20I%20would%20like%20to%20get%20more%20information%2C%20please.%0A%0AThank%20you.%0A";

}




export async function gethomeTeamsName(team) {
  try {
    var url = "https://api.statorium.com/api/v1/teams/" + team + "/?season_id=1&apikey=823a6dc00c5478726b0d0ed8601e06c6";
    const result = await axios(url);
    return result.data.team.teamName
  } catch (e) {
    console.log(e);
  }
}