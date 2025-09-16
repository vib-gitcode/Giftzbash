fetch('/api/users')
  .then(res => res.json())
  .then(users => renderTable(users))
  .catch(err => {
    document.getElementById('user-table-container').innerText = "Error loading users.";
    console.error("Fetch error:", err);
  });

function renderTable(users) {
  const container = document.getElementById('user-table-container');
  let html = `<table>
                <tr>
                  <th>Username</th>
                  <th>Role</th>
                  <th>New Password</th>
                  <th>Action</th>
                </tr>`;

  users.forEach((user, index) => {
    html += `<tr>
              <td>${user.username}</td>
              <td>${user.role}</td>
              <td><input type="password" id="pass-${index}" /></td>
              <td><button onclick="updatePassword('${user.username}', ${index})">Update</button></td>
            </tr>`;
  });

  html += `</table>`;
  container.innerHTML = html;
}

function updatePassword(username, index) {
  const password = document.getElementById(`pass-${index}`).value;
  if (password.length < 5) {
    alert("Password must be at least 5 characters.");
    return;
  }

  fetch('/api/update-password', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  })
  .then(res => res.json())
  .then(data => {
    alert(data.message);
  })
  .catch(err => {
    console.error("Update error:", err);
    alert("Failed to update password.");
  });
}
