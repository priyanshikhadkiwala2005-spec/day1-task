let products = JSON.parse(localStorage.getItem("products")) || [];
let editIndex = -1;

// SAVE
function save()
{
  localStorage.setItem("products", JSON.stringify(products));
}

// ADD / UPDATE PRODUCT
function addProduct()
{
  let name = document.getElementById("name").value;
  let category = document.getElementById("category").value;
  let price = Number(document.getElementById("price").value);
  let qty = Number(document.getElementById("qty").value);

  if (!name || !category || !price || !qty)
  {
    alert("Fill all fields");
    return;
  }

  if (editIndex === -1)
  {
    products.push({ name, category, price, qty });
  }
  else
  {
    products[editIndex] = { name, category, price, qty };
    editIndex = -1;

    document.getElementById("addBtn").innerText = "Add Product";
  }

  save();
  clearInputs();
  render();
}

// CLEAR INPUTS
function clearInputs()
{
  document.getElementById("name").value = "";
  document.getElementById("category").value = "";
  document.getElementById("price").value = "";
  document.getElementById("qty").value = "";

  document.getElementById("addBtn").innerText = "Add Product";
}

// DELETE
function del(i)
{
  products.splice(i, 1);
  save();
  render();
}

// EDIT
function edit(i)
{
  let p = products[i];

  document.getElementById("name").value = p.name;
  document.getElementById("category").value = p.category;
  document.getElementById("price").value = p.price;
  document.getElementById("qty").value = p.qty;

  editIndex = i;

  document.getElementById("addBtn").innerText = "Update Product";
}

// STOCK IN
function stockIn(i)
{
  products[i].qty += 1;
  save();
  render();
}

// STOCK OUT
function stockOut(i)
{
  if (products[i].qty > 0)
  {
    products[i].qty -= 1;
  }

  save();
  render();
}

// DASHBOARD
function updateDashboard(list)
{
  let totalProducts = list.length;
  let totalQty = 0;
  let totalValue = 0;

  list.forEach(p =>
  {
    totalQty += p.qty;
    totalValue += p.qty * p.price;
  });

  document.getElementById("totalProducts").innerText = totalProducts;
  document.getElementById("totalQty").innerText = totalQty;
  document.getElementById("totalValue").innerText = totalValue;
}

// RENDER PRODUCTS
function render()
{
  let list = document.getElementById("list");
  let search = document.getElementById("search").value.toLowerCase();
  let filter = document.getElementById("filter").value;

  list.innerHTML = "";

  let filtered = products.filter(p =>
  {
    return (
      p.name.toLowerCase().includes(search) &&
      (filter === "" || p.category === filter)
    );
  });

  // UPDATE CATEGORY DROPDOWN
  let categories = [...new Set(products.map(p => p.category))];

  document.getElementById("filter").innerHTML =
    `<option value="">All Categories</option>` +
    categories.map(c => `<option value="${c}">${c}</option>`).join("");

  filtered.forEach((p, i) =>
  {
    list.innerHTML += `
      <div class="product">
        <h3>${p.name}</h3>
        <p>Category: ${p.category}</p>
        <p>Price: ₹${p.price}</p>

        <p class="${p.qty < 10 ? "low" : ""}">
          Quantity: ${p.qty} ${p.qty < 10 ? "Low Stock" : ""}
        </p>

        <button class="btn" onclick="stockIn(${i})">Stock In</button>
        <button class="btn" onclick="stockOut(${i})">Stock Out</button>
        <button class="btn" onclick="edit(${i})">Edit</button>
        <button class="btn" onclick="del(${i})">Delete</button>
      </div>
    `;
  });

  updateDashboard(filtered);
}

render();
