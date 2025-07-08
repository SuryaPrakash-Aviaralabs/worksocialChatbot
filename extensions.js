const SVG_Thumb = `<svg width="24px" height="24px" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.29398 20.4966C4.56534 20.4966 4 19.8827 4 19.1539V12.3847C4 11.6559 4.56534 11.042 5.29398 11.042H8.12364L10.8534 4.92738C10.9558 4.69809 11.1677 4.54023 11.4114 4.50434L11.5175 4.49658C12.3273 4.49658 13.0978 4.85402 13.6571 5.48039C14.2015 6.09009 14.5034 6.90649 14.5034 7.7535L14.5027 8.92295L18.1434 8.92346C18.6445 8.92346 19.1173 9.13931 19.4618 9.51188L19.5612 9.62829C19.8955 10.0523 20.0479 10.6054 19.9868 11.1531L19.1398 18.742C19.0297 19.7286 18.2529 20.4966 17.2964 20.4966H8.69422H5.29398ZM11.9545 6.02658L9.41727 11.7111L9.42149 11.7693L9.42091 19.042H17.2964C17.4587 19.042 17.6222 18.8982 17.6784 18.6701L17.6942 18.5807L18.5412 10.9918C18.5604 10.8194 18.5134 10.6486 18.4189 10.5287C18.3398 10.4284 18.2401 10.378 18.1434 10.378H13.7761C13.3745 10.378 13.0488 10.0524 13.0488 9.65073V7.7535C13.0488 7.2587 12.8749 6.78825 12.5721 6.44915C12.4281 6.28794 12.2615 6.16343 12.0824 6.07923L11.9545 6.02658ZM7.96636 12.4966H5.45455V19.042H7.96636V12.4966Z" fill="white"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M5.29398 20.4966C4.56534 20.4966 4 19.8827 4 19.1539V12.3847C4 11.6559 4.56534 11.042 5.29398 11.042H8.12364L10.8534 4.92738C10.9558 4.69809 11.1677 4.54023 11.4114 4.50434L11.5175 4.49658C12.3273 4.49658 13.0978 4.85402 13.6571 5.48039C14.2015 6.09009 14.5034 6.90649 14.5034 7.7535L14.5027 8.92295L18.1434 8.92346C18.6445 8.92346 19.1173 9.13931 19.4618 9.51188L19.5612 9.62829C19.8955 10.0523 20.0479 10.6054 19.9868 11.1531L19.1398 18.742C19.0297 19.7286 18.2529 20.4966 17.2964 20.4966H8.69422H5.29398ZM11.9545 6.02658L9.41727 11.7111L9.42149 11.7693L9.42091 19.042H17.2964C17.4587 19.042 17.6222 18.8982 17.6784 18.6701L17.6942 18.5807L18.5412 10.9918C18.5604 10.8194 18.5134 10.6486 18.4189 10.5287C18.3398 10.4284 18.2401 10.378 18.1434 10.378H13.7761C13.3745 10.378 13.0488 10.0524 13.0488 9.65073V7.7535C13.0488 7.2587 12.8749 6.78825 12.5721 6.44915C12.4281 6.28794 12.2615 6.16343 12.0824 6.07923L11.9545 6.02658ZM7.96636 12.4966H5.45455V19.042H7.96636V12.4966Z" fill="currentColor"></path></svg>`;

export const FormExtension = {
    name: "Forms",
    type: "response",
    match: ({ trace }) =>
        trace.type === "Custom_Form" || trace.payload?.name === "Custom_Form",
    render: ({ trace, element }) => {
        const formContainer = document.createElement("form");

        formContainer.innerHTML = `
      <style>
        label {
          font-size: 0.8em;
          color: #888;
        }
        input[type="text"], input[type="email"], input[type="tel"] {
          width: 100%;
          border: none;
          border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
          background: transparent;
          margin: 5px 0;
          outline: none;
          padding: 8px 0; /* Added some padding for better UX */
        }
        .phone {
          width: 150px;
        }
        .invalid {
          border-color: red;
        }
        .submit {
          background: linear-gradient(to right, #2e6ee1, #2e7ff1);
          border: none;
          color: white;
          padding: 10px;
          border-radius: 5px;
          width: 100%;
          cursor: pointer;
        }
      </style>

      <label for="name">Name</label>
      <input type="text" class="name" name="name" required><br><br>

      <label for="email">Email</label>
      <input type="email" class="email" name="email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$" title="Invalid email address"><br><br>

      <label for="phone">Phone Number</label>
      <input type="tel" class="phone" name="phone" required pattern="\\d+" title="Invalid phone number, please enter only numbers"><br><br>

      <input type="submit" class="submit" value="Submit">
    `;

        formContainer.addEventListener("input", function () {
            // Remove 'invalid' class when input becomes valid
            const name = formContainer.querySelector(".name");
            const email = formContainer.querySelector(".email");
            const phone = formContainer.querySelector(".phone");

            if (name.checkValidity()) name.classList.remove("invalid");
            if (email.checkValidity()) email.classList.remove("invalid");
            if (phone.checkValidity()) phone.classList.remove("invalid");
        });

        formContainer.addEventListener("submit", function (event) {
            event.preventDefault();

            const name = formContainer.querySelector(".name");
            const email = formContainer.querySelector(".email");
            const phone = formContainer.querySelector(".phone");

            if (
                !name.checkValidity() ||
                !email.checkValidity() ||
                !phone.checkValidity()
            ) {
                name.classList.add("invalid");
                email.classList.add("invalid");
                phone.classList.add("invalid");
                return;
            }

            formContainer.querySelector(".submit").remove();

            window.voiceflow.chat.interact({
                type: "complete",
                payload: { name: name.value, email: email.value, phone: phone.value },
            });
        });

        element.appendChild(formContainer);
    },
};

// Date extension for selecting a date and time

export const DateExtension = {
    name: "Date",
    type: "response",
    match: ({ trace }) =>
        trace.type === "ext_date" || trace.payload?.name === "ext_date",
    render: ({ trace, element }) => {
        const now = new Date();
        const minDate = new Date(now);
        const maxDate = new Date(now);
        maxDate.setMonth(now.getMonth() + 2);
        const minDateStr = minDate.toISOString().split("T")[0];
        const maxDateStr = maxDate.toISOString().split("T")[0];

        const form = document.createElement("form");

        form.innerHTML = `
      <style>
        label {
          font-size: 0.8em;
          color: #888;
        }
        input[type="text"],
        input[type="email"],
        input[type="tel"],
        input[type="date"],
        select {
          width: 100%;
          border: none;
          border-bottom: 0.5px solid rgba(0, 0, 0, 0.1);
          background: transparent;
          margin: 5px 0;
          padding: 8px 0;
          font: normal 14px sans-serif;
          outline: none;
        }
select {
  max-height: 40px;
  overflow-y: hidden;
}
select:focus {
  max-height: 200px;
  overflow-y: scroll;
}

select::-webkit-scrollbar {
  width: 6px;
}
select::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 4px;
}


        .invalid {
          border-color: red;
        }
        .submit {
          background: linear-gradient(to right, #2e6ee1, #2e7ff1);
          border: none;
          color: white;
          padding: 10px;
          border-radius: 5px;
          width: 100%;
          cursor: pointer;
          opacity: 0.3;
        }
        .submit:enabled {
          opacity: 1;
        }
        .error-msg {
          color: red;
          font-size: 0.8em;
          display: none;
        }
      </style>

      <label>Name</label>
      <input type="text" id="name" required /><br>

      <label>Email</label>
      <input type="email" id="email" required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$" /><br>

      <label>Phone Number</label>
      <input type="tel" id="phone" required pattern="\\d{7,}" title="Enter at least 7 digits" /><br>

      <label>Select a date</label>
      <input type="date" id="appointmentDate" min="${minDateStr}" max="${maxDateStr}" /><br>

      <label>Select a time slot</label>
      <select id="appointmentTime">
        <option value="">-- Select Time --</option>
      </select><br>

      <small class="error-msg" id="error-msg">Please fill all fields correctly.</small><br>
      <input type="submit" class="submit" value="Submit" disabled>
    `;

        const timeSelect = form.querySelector("#appointmentTime");
        for (let h = 9; h <= 16; h++) {
            for (let m of [0, 30]) {
                if (h === 9 && m < 30) continue;
                if (h === 16 && m > 30) continue;
                const time = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`;
                const option = document.createElement("option");
                option.value = time;
                option.textContent = time;
                timeSelect.appendChild(option);
            }
        }

        const name = form.querySelector("#name");
        const email = form.querySelector("#email");
        const phone = form.querySelector("#phone");
        const dateInput = form.querySelector("#appointmentDate");
        const submitButton = form.querySelector(".submit");
        const errorMsg = form.querySelector("#error-msg");

        function validate() {
            const nameValid = name.checkValidity();
            const emailValid = email.checkValidity();
            const phoneValid = phone.checkValidity();

            let datetimeValid = true;
            const dateVal = dateInput.value;
            const timeVal = timeSelect.value;

            if (!dateVal || !timeVal) datetimeValid = false;
            else {
                const [y, m, d] = dateVal.split("-").map(Number);
                const [h, mi] = timeVal.split(":").map(Number);
                const selected = new Date(y, m - 1, d, h, mi);
                const nowCheck = new Date();
                if (selected <= nowCheck) datetimeValid = false;
                if (selected.getDay() === 0) datetimeValid = false;
                if (h < 9 || (h === 9 && mi < 30) || h > 16 || (h === 16 && mi > 30)) datetimeValid = false;
            }

            name.classList.toggle("invalid", !nameValid);
            email.classList.toggle("invalid", !emailValid);
            phone.classList.toggle("invalid", !phoneValid);
            dateInput.classList.toggle("invalid", !datetimeValid);
            timeSelect.classList.toggle("invalid", !datetimeValid);

            const allValid = nameValid && emailValid && phoneValid && datetimeValid;
            errorMsg.style.display = allValid ? "none" : "block";
            submitButton.disabled = !allValid;
        }

        form.addEventListener("input", validate);

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const dateVal = dateInput.value;
            const timeVal = timeSelect.value;
            const datetime = `${dateVal}T${timeVal}`;

            const display = new Date(datetime).toLocaleString("en-US", {
                weekday: "long",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
                month: "short",
                day: "numeric"
            }) || datetime;

            [name, email, phone, dateInput, timeSelect].forEach(el => el.disabled = true);
            submitButton.remove();

            window.voiceflow.chat.interact({
                type: "complete",
                payload: {
                    appointmentDateTime: {
                        name: name.value,
                        email: email.value,
                        phone: phone.value,
                        datetime,
                        display
                    }
                }
            });
        });

        element.appendChild(form);
    }
};


