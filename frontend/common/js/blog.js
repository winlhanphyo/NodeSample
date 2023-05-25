window.onload = function () {
  getBlogList();
};

/**
 * get blog list.
 */
function getBlogList(data = null) {
  if (data) {
    createTable(data);
  } else {
    fetch('http://localhost:3000/api/blogs')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        const blogList = data.data;
        createTable(blogList);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
}

function createTable(blogList) {
  let element = document.getElementById("bloglist");
  element.innerHTML = "";
  for (let i = 0; i < blogList.length; i++) {
    let row = document.createElement('tr');
    let cell = document.createElement('td');
    cell.textContent = i + 1;
    row.appendChild(cell);

    cell = document.createElement('td');
    cell.textContent = blogList[i].title;
    row.appendChild(cell);

    cell = document.createElement('td');
    cell.textContent = blogList[i].description;
    row.appendChild(cell);

    cell = document.createElement('td');
    cell.textContent = formatDate(blogList[i].createdAt);
    row.appendChild(cell);

    cell = document.createElement('td');
    cell.textContent = formatDate(blogList[i].updatedAt);
    row.appendChild(cell);

    cell = document.createElement('td');
    const updateBtn = "<button class='btn-update' onclick=editBlog('" + blogList[i]._id.toString() + "')>Update</button>";
    const deleteBtn = "<button class='btn-delete' onclick=deleteBlog('" + blogList[i]._id.toString() + "')>Delete</button>";
    cell.innerHTML = updateBtn + "&nbsp;" + deleteBtn;
    row.appendChild(cell);

    row.appendChild(cell);
    element.appendChild(row);
  }
}

/**
 * show the new and update blog dialog.
 */
function showDialog() {
  document.getElementById("overlay").style.display = "block";
  document.getElementById("dialog").style.display = "block";
}

/**
 * hide the new and update blog dialog.
 */
function hideDialog() {
  document.getElementById("overlay").style.display = "none";
  document.getElementById("dialog").style.display = "none";
}

function addNew() {
  localStorage.removeItem("id");
  showDialog();
}

/**
 * addBlog
 */
function addBlog() {
  let id = localStorage.getItem("id");
  const textInputs = document.querySelectorAll('#blogForm input[type="text"], #blogForm textarea');
  let jsonData = {};
  textInputs.forEach(input => {
    console.log(input.name, input.value);
    jsonData[input.name] = input.value;
  });
  if (id) {
    fetch(`http://localhost:3000/api/blogs/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonData),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        getBlogList();
        hideDialog();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  } else {
    fetch('http://localhost:3000/api/blogs', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonData),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        getBlogList();
        hideDialog();
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
}

/**
 * delete Blog
 * @param {*} id 
 */
function deleteBlog(id) {
  console.log('delete blog', id);
  const seletedUser = confirm('Are you sure you want to delete this blog?');
  if (seletedUser) {
    fetch(`http://localhost:3000/api/blogs/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        // Check the response status
        if (response.ok) {
          alert('Blog deleted successfully');
          getBlogList();
        } else {
          alert('Failed to delete the blog');
        }
      })
      .catch(error => {
        // Handle any errors that occurred
        console.error('Error:', error);
      });
  }
}

function editBlog(id) {
  localStorage.setItem("id", id);
  fetch(`http://localhost:3000/api/blogs/${id}`)
    .then(response => response.json())
    .then(data => {
      data = data.data;
      console.log(data);
      const textInputs = document.querySelectorAll('#blogForm input[type="text"], #blogForm textarea');
      textInputs.forEach(input => {
        input.value = data[input.name];
      });
      showDialog();
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

function search() {
  const textInput = document.querySelector('.content .btn-content .search-content input');
  console.log(textInput.value);
  fetch('http://localhost:3000/api/blogs/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: textInput.value
    }),
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      getBlogList(data.data);
      hideDialog();
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

/**
 * format date.
 * @param {*} date 
 * @returns 
 */
function formatDate(date) {
  date = new Date(date);
  const day = String(date.getDate()).padStart(2, '0'); // 2-digit day
  const month = String(date.getMonth() + 1).padStart(2, '0'); // 2-digit month (January is 0)
  const year = String(date.getFullYear()); // 4-digit year
  return `${day}-${month}-${year}`;
}
