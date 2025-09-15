// Show status messages in this element
const statusEl = document.getElementById('status');
const container = document.getElementById('user-table-container');

function loadUsers() {
  statusEl.textContent = 'Loading users...';

  fetch('http://127.0.0.1:5000/api/users')
    .then(response => {
      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      return response.json();
    })
    .then(users => {
      statusEl.textContent = '✅ Users loaded successfully';
      renderUsers(users);
    })
    .catch(err => {
      statusEl.textContent = '❌ Error loading users: ' + err.message;
      container.innerHTML = '';
    });
}

function renderUsers(users) {
  if (!Array.isArray(users) || users.length === 0) {
    container.innerHTML = '<p>No users found.</p>';
    return;
  }

  const table = document.createElement('table');
  table.innerHTML = `
    <thead>
      <tr>
        <th>Username</th>
        <th>Password</th>
        <th>Role</th>
        <th>New Password</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      ${users.map((user, index) => `
        <tr>
          <td>${user.username}</td>
          <td>${user.password}</td>
          <td>${user.role}</td>
          <td><input type="password" id="newpass-${index}" placeholder="New password" /></td>
          <td><button onclick="changePassword('${user.username}', ${index})">Change</button></td>
        </tr>
      `).join('')}
    </tbody>
  `;
  container.innerHTML = '';
  container.appendChild(table);
}

function changePassword(username, index) {
  const newPass = document.getElementById(`newpass-${index}`).value.trim();
  if (!newPass) {
    alert('Please enter a new password.');
    return;
  }

  fetch('http://127.0.0.1:5000/api/update-password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password: newPass })
  })
  .then(response => {
    if (!response.ok) throw new Error(`Server error: ${response.status}`);
    return response.json();
  })
  .then(data => {
    alert(data.message);
    loadUsers(); // Refresh user list to show updated passwords
  })
  .catch(err => {
    alert('Error updating password: ' + err.message);
  });
}

// Run loadUsers once page loads
window.onload = loadUsers;
