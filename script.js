const showHideAdd = document.getElementById("addSub")
const appSelect = document.getElementById("apps")
const priceInput = document.getElementById("priceinput")
const Price = document.getElementById("price")
const BillingCycleInput = document.getElementById("billingCycleInput")
const startDateInput = document.getElementById("start-date")
const tableRow = document.getElementById("tableRow")
const inputsForm = document.getElementById("inputPart")
const submitSubscription = document.getElementById("submitSubscription")
const EmptyInputError = document.getElementById("errorEmpty")
const appName = document.getElementById("app-name")
const MonthYear = document.querySelector(".unit")
const StartDate = document.getElementById("date-cell")
const nextPayment = document.getElementById("next-payment")
const editBtn = document.getElementById("fedit")
const deleteBtn = document.querySelectorAll(".btn-delete")
const billingCycle = document.getElementById("cycle-pill")
const FullTable = document.getElementById("table-card")
const totalSpending = document.getElementById("totalSpending")
const activeSubscriptions = document.getElementById("activeSubscriptions")
const mostExpensiveApp = document.getElementById("mostExpensive")
const mostExpensiveName = document.getElementById("mostExpensiveName")
const searchButton = document.getElementById("SearchbtnID")
const searchInput = document.getElementById("SearchInputID")
const CancelBtn = document.getElementById("CancelbtnID")
const saveChanges = document.getElementById("saveChanges")
const btnEdit = document.querySelectorAll(".btn-edit")


showHideAdd.addEventListener("click",function(){
    inputsForm.style.display = "flex";
    
})

let ListOfSubscriptions = []
    // PLACE OF STATS CODE 
    function CalculateTotalSpending (){
        let total = 0
        for (let singleSubscription of ListOfSubscriptions){
            total = total + singleSubscription["price"]
        }
        console.log(total)
        return total;
        
    }
    function calculateActiveSubs(){
        let counter = 0
        for (let singleSubscription of ListOfSubscriptions){ //you can use ListOfSubscriptions.length to get the length without loop 
            counter = counter+1
        }
        console.log(counter)
        return counter
    }
    function mostExpensive(){
        if (ListOfSubscriptions.length === 0){
            return null
        }
        let max = ListOfSubscriptions[0]
        for (let singleSubscription of ListOfSubscriptions){
            if (singleSubscription["price"]>max["price"]){
                max = singleSubscription
            }
        }
        console.log(max["price"])
        return max  // return max and not return max["price"] -> to have the other data like name, date etc... and use it in innert html using max["the Data I Want"]
    }

function MonthOrYear(){
            if (BillingCycleInput.value == "Monthly"){
                return "/Month"
            }else{
                return "/Year"
            }
        }
function NextPaymentCalculate(){
        let date = new Date(startDateInput.value)
        if (BillingCycleInput.value == "Monthly"){
                date.setMonth(date.getMonth() + 1)
                
        }
        else{
                date.setFullYear(date.getFullYear() + 1)
        }
        return `${date.getDate()} ${date.toLocaleString("en-US",{month:"short"})} ${date.getFullYear()}`;
        // ${date.toLocaleString("en-US",{month:"sort"})} : take month(0,11) -> turn it into string in english -> use short form (or long or numeric)
        // return date.toDateString(); // toDateString used to remove the time from output and keep only DAY MONTH YEAR --- "Sat Apr 10 2027 +removed: 01:00:00 GMT+0100 (GMT+01:00)+"

        }

function AddAPP (){
    submitSubscription.addEventListener("click",function(){
        if (appSelect.value == "" || priceInput.value == "" || BillingCycleInput.value == "" || startDateInput.value == "" ){
            EmptyInputError.style.display = "flex"
        }
        else{
        EmptyInputError.style.display = "none"
        
        // Convert the HTML date input value from 10-08-2026 to 10 aug 2026
        let startDateNotFormatted = new Date(startDateInput.value)
        let formattedStartedDate = `${startDateNotFormatted.getDate()} ${startDateNotFormatted.toLocaleString("en-US", { month: "short" })} ${startDateNotFormatted.getFullYear()}`
        let imgSrc = appSelect.value+".png";
        
        // if (appSelect.value == "Netflix"){
        //     imgSrc = "netflix.png"
        // }
        // else if (appSelect.value == "ChatGPT"){
        //     imgSrc = "chatgpt.png"
        // }
        // else if (appSelect.value == "Claude"){
        //     imgSrc = "claude.svg"
        // }
        let singleRow = document.createElement("div")
        singleRow.classList.add("table-row")
        singleRow.innerHTML = `
        <div class="id-cell">${ListOfSubscriptions.length+1}</div>
            <div class="app-cell">
      <div class="app-icon"><img class="iconApp" src="${imgSrc}" alt=""></div>
      <div>
        <div class="app-name">${appSelect.value}</div>
      </div>
    </div>

    <div class="price-cell">
      <span class="price">$${priceInput.value}</span><span class="unit">${MonthOrYear()}</span>
    </div>

    <div><span class="cycle-pill cycle-monthly">${BillingCycleInput.value}</span></div>

    <div class="date-cell">${formattedStartedDate}</div>
    
    <div class="next-payment date-soon">${NextPaymentCalculate()}</div>

    <div><button class="btn-edit">Edit</button></div>

    <div><button class="btn-delete">Delete</button></div>
  </div>
        `;
        let SubscriptionObject = {
    "id": ListOfSubscriptions.length+1,
    "app" : appSelect.value,
    "price" : Number(priceInput.value),
    "billing-cycle": BillingCycleInput.value,
    "startDate": startDateInput.value
    }
    ListOfSubscriptions.push(SubscriptionObject)
    appSelect.value = "Choose an App"
    priceInput.value = ""
    BillingCycleInput.value = "Choose a billing cycle"
    startDateInput.value = ""
        
    FullTable.appendChild(singleRow)

    totalSpending.textContent = `$${CalculateTotalSpending()}`
    activeSubscriptions.textContent = `${calculateActiveSubs()}`
    mostExpensiveApp.textContent = `$${mostExpensive()["price"]}`
    mostExpensiveName.textContent = `${mostExpensive()["app"]} Subscription`
    console.log(ListOfSubscriptions)
    console.log(typeof priceInput.value)
    }
    
            
});        

}

// Event Delegation: whenever u click something on the document, check if what u click is inside an element .btn-delete or it's the element .btn-delete it self and if yes then delete the row of it
function DeleteApp (){
    document.addEventListener("click", function(e) {

    const btn = e.target.closest(".btn-delete");

    if (btn) {
        const Deletedrow = btn.closest(".table-row");
        if (Deletedrow) {
            Deletedrow.remove();
        }
        const deletedAppId = Number((Deletedrow.querySelector(".id-cell").textContent))
        for (let subscription of ListOfSubscriptions){
        if (subscription["id"]==deletedAppId ){
            let DeletedAppIndex = ListOfSubscriptions.indexOf(subscription)
            ListOfSubscriptions.splice(DeletedAppIndex,1) //(start,count) start from index 1 and delete only 1 which is itself
            }
        }
    totalSpending.textContent = `$${CalculateTotalSpending()}`
    activeSubscriptions.textContent = `${calculateActiveSubs()}`
    let maxApp = mostExpensive();
    if (maxApp) {
        mostExpensiveApp.textContent = `$${maxApp["price"]}`;
        mostExpensiveName.textContent = `${maxApp["app"]} Subscription`;
    } else {
        mostExpensiveApp.textContent = `$0`;
        mostExpensiveName.textContent = `No Subscription`;
}
    }
    

});
}





let currentEditId = null;

function UpdateApp (){
    document.addEventListener("click", function(e) {

        const btn = e.target.closest(".btn-edit");

        if (!btn) return;

        const row = btn.closest(".table-row");

        const id = Number(row.querySelector(".id-cell").textContent);

        let subscription = null;

        for (let sub of ListOfSubscriptions){
            if (sub["id"] === id){
                subscription = sub;
                break;
            }
        }

        if (!subscription) return;

        // store current editing id
        currentEditId = id;

        // fill inputs
        appSelect.value = subscription.app;
        priceInput.value = subscription.price;
        BillingCycleInput.value = subscription["billing-cycle"];
        startDateInput.value = subscription.startDate;

        // switch UI
        saveChanges.style.display = "flex";
        submitSubscription.style.display = "none";

    });

    saveChanges.addEventListener("click", function(){

        if (currentEditId === null) return;

        for (let sub of ListOfSubscriptions){
            if (sub["id"] === currentEditId){

                sub["app"] = appSelect.value;
                sub["price"] = Number(priceInput.value);
                sub["billing-cycle"] = BillingCycleInput.value;
                sub["startDate"] = startDateInput.value;

                break;
            }
        }

        // reset UI
        saveChanges.style.display = "none";
        submitSubscription.style.display = "flex";

        currentEditId = null;

        // reset inputs
        appSelect.value = "Choose an App";
        priceInput.value = "";
        BillingCycleInput.value = "Choose a billing cycle";
        startDateInput.value = "";
        FullTable.innerHTML = "";
        
        for (let sub of ListOfSubscriptions){
        function NextPaymentCalculate(){
        let date = new Date(sub["startDate"])
        if (sub["billing-cycle"] == "Monthly"){
                date.setMonth(date.getMonth() + 1)
                
        }
        else{
                date.setFullYear(date.getFullYear() + 1)
        }
        return `${date.getDate()} ${date.toLocaleString("en-US",{month:"short"})} ${date.getFullYear()}`;
        // ${date.toLocaleString("en-US",{month:"sort"})} : take month(0,11) -> turn it into string in english -> use short form (or long or numeric)
        // return date.toDateString(); // toDateString used to remove the time from output and keep only DAY MONTH YEAR --- "Sat Apr 10 2027 +removed: 01:00:00 GMT+0100 (GMT+01:00)+"

        }
        let startDateNotFormatted = new Date(sub["startDate"])
        let formattedStartedDate = `${startDateNotFormatted.getDate()} ${startDateNotFormatted.toLocaleString("en-US", { month: "short" })} ${startDateNotFormatted.getFullYear()}`
        
        let singleRow = document.createElement("div")
        singleRow.classList.add("table-row")
        singleRow.innerHTML = `
        <div class="id-cell">${sub["id"]}</div>
            <div class="app-cell">
      <div class="app-icon"><img class="iconApp" src="${sub["app"]+".png"}" alt=""></div>
      <div>
        <div class="app-name">${sub["app"]}</div>
      </div>
    </div>

    <div class="price-cell">
      <span class="price">$${sub["price"]}</span><span class="unit">${MonthOrYear()}</span>
    </div>

    <div><span class="cycle-pill cycle-monthly">${sub["billing-cycle"]}</span></div>

    <div class="date-cell">${formattedStartedDate}</div>
    
    <div class="next-payment date-soon">${NextPaymentCalculate()}</div>

    <div><button class="btn-edit">Edit</button></div>

    <div><button class="btn-delete">Delete</button></div>
  </div>
        `;
        console.log(ListOfSubscriptions)
    FullTable.appendChild(singleRow)

    totalSpending.textContent = `$${CalculateTotalSpending()}`
    activeSubscriptions.textContent = `${calculateActiveSubs()}`
    mostExpensiveApp.textContent = `$${mostExpensive()["price"]}`
    mostExpensiveName.textContent = `${mostExpensive()["app"]} Subscription`

        }
    });
}







function SearchApp (){
    searchButton.addEventListener("click", function(){

        let SearchValue = searchInput.value.toLowerCase();

        let rows = document.querySelectorAll(".table-row");

        rows.forEach(function(row){
    
            let appName = row.querySelector(".app-name").textContent.toLowerCase();
            
            if (appName.includes(SearchValue)){
                row.style.display = "grid";
            } else {
                row.style.display = "none";
            }
    
        });
        CancelBtn.style.display="flex"
    });
    CancelBtn.addEventListener("click",function(){
        const rows = document.querySelectorAll(".table-row");

        rows.forEach(function(row){
            row.style.display="grid";
        })
        CancelBtn.style.display="none"
    })
}
DeleteApp ()
AddAPP() // REMAINING : ADD APP FUNCTION only retouches 
SearchApp()
UpdateApp()
