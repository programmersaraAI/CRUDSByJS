let priceOfProduct = document.getElementById('priceOfProduct');
let discountOfProduct = document.getElementById('discountOfProduct');
let taxesOfProduct = document.getElementById('taxesOfProduct');
let total = document.getElementById('total');
let nameOfProduct = document.getElementById('nameOfProduct');
let category = document.getElementById('category');
let createProduct = document.getElementById('createProduct');
let products; // to save the products in it
let table =document.getElementById('table');
let tbody =document.getElementById('tbody');
let count =document.getElementById('count');
let deleteAll =document.getElementById('deleteAll');
let SearchFor =document.getElementById('SearchFor');
let mood ='create';
let temp;
let line;
let flag;
//-------------------- display localStorage ----------------------------------------------------------
if(localStorage.length >0){
    products= JSON.parse(localStorage.getItem('products'));
    if (!Array.isArray(products)) {
        products = []; // Ensure products is an array
    }
    read();
}else{
    products=[];
}
//--------------------- Run Create Button --------------------------------------------------------
//--------------------- Create Product ------------------------------------------------------------
createProduct.onclick =function(){
     let product = {
        productName : nameOfProduct.value.toLowerCase(),
        productPrice : priceOfProduct.value,
        productTaxes : taxesOfProduct.value,
        productDiscount : discountOfProduct.value,
        productTotal : total.innerHTML,
        productCount :count.value,
        productCategory : category.value.toLowerCase(),
    };
    clearData();
    if(mood ==='create'){
        if(count.value != ''){
            for(let i =0;i<count.value;i++){ //count ; repeat proucts ------
            products.push(product);
        }
        }else{
            products.push(product);
        }
        
        deleteAll.style.display='block';
     }else{
         products[temp] = product;
         mood = 'create';
         createProduct.innerHTML='CREATE';
         count.style.display ='block';
     }
    
    localStorage.setItem('products',JSON.stringify(products));
    clearInputs();
    read();
    console.log(products);
}
//--------------------- Get Total ----------------------------------------------------------------
function getTotal(){
    if(priceOfProduct.value != '')
    {
        let result =0;
        result = (+priceOfProduct.value + +taxesOfProduct.value) - +discountOfProduct.value;
        total.innerHTML =result;
    }
}

//-------------------- Clear Inputs ------------------------------------------------------------------
function clearInputs(){
    nameOfProduct.value='';
    priceOfProduct.value='';
    taxesOfProduct.value='';
    discountOfProduct.value='';
    category.value ='';
    count.value='';
    total.innerHTML='';
    SearchFor.value='';
}
//--------------------- Display Data 'Read' -----------------------------------------------------------
function read(){
    line='';
    if(products.length>0){
        line ='<button>Delete All ('+products.length+')</button>';
    }else{
        deleteAll.style.display='none';
    }
    let lines ='';
    for(let i=0;i<products.length;i++){
    lines += '<tr>'
    +'<td>'+(i+1)+'</td>'
    +'<td>'+products[i].productName+'</td>'
    +'<td>'+products[i].productPrice+'</td>'
    +'<td>'+products[i].productDiscount+'</td>'
    +'<td>'+products[i].productTaxes+'</td>'
    +'<td>'+products[i].productTotal+'</td>'
    +'<td>'+products[i].productCategory+'</td>'
    +'<td><button onclick="deleteProduct('+i+')">Delete</button></td>'
    +'<td><button onclick="update('+i+')">Update</button></td>'
    +'</tr>';
    }
    tbody.innerHTML=lines;
    deleteAll.innerHTML=line;
}
//-------------------- Update Data ---------------------------------------------------------------------
function update(i){
   nameOfProduct.value =  products[i].productName;
   priceOfProduct.value =products[i].productPrice;
   discountOfProduct.value =products[i].productDiscount;
   taxesOfProduct.value =products[i].productTaxes;
   getTotal();
   count.style.display='none';
   category.value =products[i].productCategory;
   createProduct.innerHTML ='UPDATE';
   mood ='update';
   temp =i;
   scrollTo({
    top:0,
    behavior: 'smooth'
   });
}
//-------------------- Delete Product -------------------------------------------------------------------
function deleteProduct(i){
    products.splice(i,1);
    read();
    localStorage.setItem('products',JSON.stringify(products));
}
//-------------------- Delete Products -------------------------------------------------------------------
function deleteProducts(){
    products =[];
    read();
    localStorage.setItem('products',JSON.stringify(products));
}
deleteAll.onclick=function(){
    deleteProducts();
}
//-------------------- Clear Data ------------------------------------------------------------------------
 function clearData(){
     if(nameOfProduct.value ==''){
         mood='cant';
     }
     if(priceOfProduct.value ==''){
        mood='cant';
     }
     if(priceOfProduct.value <= 0){
        mood='cant';
     }
 }
 //------------------- Search For Products ---------------------------------------------------------------
 function searchProducts(flag){
    let lines='';
    SearchFor.focus();
    if(flag =='searchByName'){
        for(let i=0;i<products.length;i++){
        if(products[i].productName.includes(SearchFor.value.toLowerCase())){
            lines += '<tr>'
            +'<td>'+(i+1)+'</td>'
            +'<td>'+products[i].productName+'</td>'
            +'<td>'+products[i].productPrice+'</td>'
            +'<td>'+products[i].productDiscount+'</td>'
            +'<td>'+products[i].productTaxes+'</td>'
            +'<td>'+products[i].productTotal+'</td>'
            +'<td>'+products[i].productCategory+'</td>'
            +'<td><button onclick="deleteProduct('+i+')">Delete</button></td>'
            +'<td><button onclick="update('+i+')">Update</button></td>'
            +'</tr>';
            tbody.innerHTML=lines;
        }
      }
    }else{
        for(let i=0;i<products.length;i++){
        if(products[i].productCategory.includes(SearchFor.value.toLowerCase())){
            lines += '<tr>'
            +'<td>'+(i+1)+'</td>'
            +'<td>'+products[i].productName+'</td>'
            +'<td>'+products[i].productPrice+'</td>'
            +'<td>'+products[i].productDiscount+'</td>'
            +'<td>'+products[i].productTaxes+'</td>'
            +'<td>'+products[i].productTotal+'</td>'
            +'<td>'+products[i].productCategory+'</td>'
            +'<td><button onclick="deleteProduct('+i+')">Delete</button></td>'
            +'<td><button onclick="update('+i+')">Update</button></td>'
            +'</tr>';
            tbody.innerHTML=lines;
        }
      }
    }
 }
 // -------------------- Refresh Products ----------------------------------------------------------
 let refreshData  = document.getElementById('ref');
 refreshData.onclick=function(){
    read();
    clearInputs();
 };