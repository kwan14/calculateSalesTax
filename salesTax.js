var salesTaxRates = {
  AB: 0.05,
  BC: 0.12,
  SK: 0.10
};

var companySalesData = [
  {
    name: "Telus",
    province: "BC",
    sales: [ 100, 200, 400 ]
  },
  {
    name: "Bombardier",
    province: "AB",
    sales: [ 80, 20, 10, 100, 90, 500 ]
  },
  {
    name: "Telus",
    province: "SK",
    sales: [ 500, 100 ]
  }
];

function calculateSalesTax(salesData, taxRates) {

  salesTotals = {};

  function sumSales(salesAmounts) {
    var sum = 0;
    for (var i = 0; i < salesAmounts.length; i++) {
      sum += salesAmounts[i];
    }
    return sum;
  }

  function calculateTaxes(rate, preTaxAmount) {
    return(rate * preTaxAmount);
  }

  for (var i = 0; i < salesData.length; i++) {
    if (salesTotals[salesData[i].name] == undefined) {
      salesTotals[salesData[i].name] = { totalSales : 0, totalTaxes : 0 };
      salesTotals[salesData[i].name].totalSales = sumSales(salesData[i].sales);
      salesTotals[salesData[i].name].totalTaxes = calculateTaxes(taxRates[salesData[i].province], salesTotals[salesData[i].name].totalSales);
    } else {
      salesTotals[salesData[i].name].totalSales += sumSales(salesData[i].sales);
      salesTotals[salesData[i].name].totalTaxes += calculateTaxes(taxRates[salesData[i].province], sumSales(salesData[i].sales));
    }

  }

   console.log(salesTotals);

}

var results = calculateSalesTax(companySalesData, salesTaxRates);

/* Expected Results:
{
  Telus: {
    totalSales: 1300
    totalTaxes: 144
  },
  Bombardier: {
    totalSales: 800,
    totalTaxes: 40
  }
}
*/

