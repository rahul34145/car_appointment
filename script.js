// Get elements from the DOM
const form = document.getElementById('appointment-form');
const appointmentList = document.getElementById('appointment-list');
const filterForm = document.getElementById('filter-form');
const filterResult = document.getElementById('filter-result');

// Function to render appointments from local storage
function renderAppointments() {
    appointmentList.innerHTML = '';
    const appointments = JSON.parse(localStorage.getItem('appointments')) || [];

    appointments.forEach((appointment, index) => {
        const appointmentElement = document.createElement('div');
        appointmentElement.classList.add('appointment-item');
        appointmentElement.innerHTML = `
            <h3>${appointment.customerName}</h3>
            <p><strong>Date:</strong> ${appointment.appointmentDate}</p>
            <p><strong>Description:</strong> ${appointment.description}</p>
            <button onclick="deleteAppointment(${index})">Delete</button>
        `;
        appointmentList.appendChild(appointmentElement);
    });

    filterAppointments(); // Update filtered result on render
}

// Function to handle form submission to add appointment
function addAppointment(event) {
    event.preventDefault();

    const customerName = document.getElementById('customer-name').value;
    const appointmentDate = document.getElementById('appointment-date').value;
    const description = document.getElementById('appointment-description').value;

    if (customerName && appointmentDate) {
        const newAppointment = {
            customerName,
            appointmentDate,
            description
        };

        let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
        appointments.push(newAppointment);
        localStorage.setItem('appointments', JSON.stringify(appointments));

        form.reset();
        renderAppointments();
    } else {
        alert('Please fill in all fields!');
    }
}

// Function to delete appointment
function deleteAppointment(index) {
    let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    appointments.splice(index, 1);
    localStorage.setItem('appointments', JSON.stringify(appointments));
    renderAppointments();
}

// Function to filter appointments by date
function filterAppointments() {
    const filterDate = document.getElementById('filter-date').value;
    let appointments = JSON.parse(localStorage.getItem('appointments')) || [];
    
    if (filterDate) {
        appointments = appointments.filter(appointment => appointment.appointmentDate === filterDate);
    }

    // Render filtered appointments
    appointmentList.innerHTML = '';
    appointments.forEach((appointment, index) => {
        const appointmentElement = document.createElement('div');
        appointmentElement.classList.add('appointment-item');
        appointmentElement.innerHTML = `
            <h3>${appointment.customerName}</h3>
            <p><strong>Date:</strong> ${appointment.appointmentDate}</p>
            <p><strong>Description:</strong> ${appointment.description}</p>
            <button onclick="deleteAppointment(${index})">Delete</button>
        `;
        appointmentList.appendChild(appointmentElement);
    });

    // Display total count for filtered appointments
    filterResult.textContent = `Total Appointments: ${appointments.length}`;
}

// Event listener for form submission
form.addEventListener('submit', addAppointment);

// Event listener for filter form submission
filterForm.addEventListener('submit', function(event) {
    event.preventDefault();
    filterAppointments();
});

// Initial rendering of appointments
renderAppointments();
rahul
