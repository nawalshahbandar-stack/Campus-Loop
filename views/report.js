// ======================================================
// CAMPUSLOOP ACTIVITY REPORT GENERATOR
// ======================================================


// HEADER IMAGE

document
    .getElementById("headerImage")
    .addEventListener("change", function () {

        const file = this.files[0];

        if (!file) {
            return;
        }

        const preview =
            document.getElementById("headerPreview");

        preview.src =
            URL.createObjectURL(file);

        preview.style.display = "block";
    });


// ======================================================
// SHOW FILE NAME
// ======================================================

function showFileName(input, output) {

    document
        .getElementById(input)
        .addEventListener("change", function () {

            const outputElement =
                document.getElementById(output);

            if (this.files.length === 0) {

                outputElement.textContent = "";

                return;
            }

            outputElement.textContent =
                "Selected: " +
                this.files[0].name;
        });
}


showFileName(
    "notice",
    "noticeName"
);

showFileName(
    "brochure",
    "brochureName"
);

showFileName(
    "attendance",
    "attendanceName"
);

showFileName(
    "certificate",
    "certificateName"
);


// ======================================================
// EVENT PHOTO PREVIEW
// ======================================================

document
    .getElementById("eventPhotos")
    .addEventListener("change", function () {

        const preview =
            document.getElementById("photoPreview");

        preview.innerHTML = "";

        Array
            .from(this.files)
            .forEach(function (file) {

                if (!file.type.startsWith("image/")) {
                    return;
                }

                const image =
                    document.createElement("img");

                image.src =
                    URL.createObjectURL(file);

                preview.appendChild(image);
            });
    });


// ======================================================
// GET VALUE
// ======================================================

function getValue(id) {

    return document
        .getElementById(id)
        .value
        .trim();
}


// ======================================================
// GENERATE REPORT
// ======================================================

function generateReport() {

    const activityName =
        getValue("activityName");

    const coordinator =
        getValue("coordinator");


    if (!activityName) {

        alert(
            "Please enter the Activity Name."
        );

        return;
    }


    if (!coordinator) {

        alert(
            "Please enter the Coordinator Name."
        );

        return;
    }


    const report =
        document.getElementById(
            "reportPreview"
        );


    report.innerHTML = "";


    // ==================================================
    // HEADER
    // ==================================================

    const header =
        document.createElement("div");

    header.className =
        "report-header";


    const headerImage =
        document.getElementById(
            "headerPreview"
        );


    if (headerImage.src &&
        headerImage.style.display !== "none") {

        const image =
            document.createElement("img");

        image.src =
            headerImage.src;

        header.appendChild(image);
    }


    const college =
        document.createElement("h1");

    college.textContent =
        getValue("collegeName") ||
        "College Name";

    header.appendChild(college);


    const department =
        document.createElement("p");

    department.textContent =
        getValue("department") ||
        "Department";

    header.appendChild(department);


    const academicYear =
        document.createElement("p");

    academicYear.textContent =
        "Academic Year: " +
        (getValue("academicYear") || "-");

    header.appendChild(
        academicYear
    );


    const documentNumber =
        getValue("documentNumber");


    if (documentNumber) {

        const doc =
            document.createElement("p");

        doc.textContent =
            "IQAC / Document No.: " +
            documentNumber;

        header.appendChild(doc);
    }


    report.appendChild(header);


    // ==================================================
    // TITLE
    // ==================================================

    const title =
        document.createElement("h2");

    title.className =
        "report-title";

    title.textContent =
        "ACTIVITY REPORT";

    report.appendChild(title);


    // ==================================================
    // ACTIVITY TABLE
    // ==================================================

    const table =
        document.createElement("table");

    table.className =
        "report-table";


    const rows = [

        [
            "Activity Name",
            activityName
        ],

        [
            "Coordinator",
            coordinator
        ],

        [
            "Day & Date",
            getValue("activityDate")
        ],

        [
            "Time",
            getValue("activityTime")
        ],

        [
            "Venue",
            getValue("venue")
        ],

        [
            "Number of Participants",
            getValue("participants")
        ],

        [
            "Nature of Activity",
            getValue("nature")
        ],

        [
            "Type of Activity",
            getValue("activityType")
        ],

        [
            "Schedule",
            getValue("schedule")
        ],

        [
            "Funding Source",
            getValue("funding")
        ],

        [
            "Amount",
            getValue("amount")
        ],

        [
            "Chief Guest",
            getValue("chiefGuest")
        ]

    ];


    rows.forEach(function (data) {

        const row =
            document.createElement("tr");


        const heading =
            document.createElement("th");

        heading.textContent =
            data[0];


        const value =
            document.createElement("td");

        value.textContent =
            data[1] || "-";


        row.appendChild(heading);

        row.appendChild(value);

        table.appendChild(row);
    });


    report.appendChild(table);


    // ==================================================
    // TEXT SECTIONS
    // ==================================================

    createSection(
        report,
        "Objectives",
        getValue("objectives")
    );


    createSection(
        report,
        "Methodology",
        getValue("methodology")
    );


    createSection(
        report,
        "Outcomes",
        getValue("outcomes")
    );


    // ==================================================
    // DOCUMENTATION
    // ==================================================

    const documentation =
        document.createElement("div");

    documentation.className =
        "report-section";


    const documentationTitle =
        document.createElement("h3");

    documentationTitle.textContent =
        "Documentation";


    documentation.appendChild(
        documentationTitle
    );


    // Notice

    addDocument(
        documentation,
        "Pre-event: Notice",
        "notice"
    );


    // Brochure

    addDocument(
        documentation,
        "Pre-event: Brochure / Flyer",
        "brochure"
    );


    // Attendance

    addDocument(
        documentation,
        "During-event: Attendance Sheet",
        "attendance"
    );


    // Photos

    const photos =
        document.getElementById(
            "eventPhotos"
        );


    if (photos.files.length > 0) {

        const wrapper =
            document.createElement("div");

        wrapper.className =
            "report-document";


        const heading =
            document.createElement("h4");

        heading.textContent =
            "During-event: Event Photos";


        wrapper.appendChild(heading);


        const grid =
            document.createElement("div");

        grid.className =
            "report-photos";


        Array
            .from(photos.files)
            .forEach(function (file) {

                if (!file.type.startsWith("image/")) {
                    return;
                }


                const image =
                    document.createElement("img");

                image.src =
                    URL.createObjectURL(file);


                grid.appendChild(image);
            });


        wrapper.appendChild(grid);

        documentation.appendChild(wrapper);
    }


    // Certificate

    addDocument(
        documentation,
        "Post-event: Certificate",
        "certificate"
    );


    report.appendChild(
        documentation
    );


    // ==================================================
    // SIGNATURES
    // ==================================================

    const signatureSection =
        document.createElement("div");

    signatureSection.className =
        "report-section";


    const signatureHeading =
        document.createElement("h3");

    signatureHeading.textContent =
        "Signatures";


    signatureSection.appendChild(
        signatureHeading
    );


    const signatures =
        document.createElement("div");

    signatures.className =
        "signatures";


    addSignature(
        signatures,
        getValue("signatureCoordinator") ||
        "Coordinator"
    );


    addSignature(
        signatures,
        getValue("committeeHead") ||
        "Head / Committee In-charge"
    );


    addSignature(
        signatures,
        getValue("iqacCoordinator") ||
        "IQAC Coordinator"
    );


    addSignature(
        signatures,
        getValue("principal") ||
        "Principal"
    );


    signatureSection.appendChild(
        signatures
    );


    report.appendChild(
        signatureSection
    );


    // ==================================================
    // SHOW REPORT
    // ==================================================

    report.style.display =
        "block";


    report.scrollIntoView({
        behavior: "smooth"
    });


    // Give browser time to render images

    setTimeout(function () {

        window.print();

    }, 1000);
}


// ======================================================
// CREATE TEXT SECTION
// ======================================================

function createSection(
    report,
    title,
    text
) {

    const section =
        document.createElement("div");

    section.className =
        "report-section";


    const heading =
        document.createElement("h3");

    heading.textContent =
        title;


    const paragraph =
        document.createElement("p");

    paragraph.textContent =
        text || "-";


    section.appendChild(
        heading
    );

    section.appendChild(
        paragraph
    );


    report.appendChild(
        section
    );
}


// ======================================================
// ADD DOCUMENT
// ======================================================

function addDocument(
    container,
    title,
    inputID
) {

    const input =
        document.getElementById(
            inputID
        );


    if (!input.files.length) {
        return;
    }


    const file =
        input.files[0];


    const wrapper =
        document.createElement("div");

    wrapper.className =
        "report-document";


    const heading =
        document.createElement("h4");

    heading.textContent =
        title;


    wrapper.appendChild(
        heading
    );


    if (
        file.type.startsWith("image/")
    ) {

        const image =
            document.createElement("img");

        image.src =
            URL.createObjectURL(file);


        wrapper.appendChild(
            image
        );

    } else {

        const fileName =
            document.createElement("p");

        fileName.textContent =
            "Attached file: " +
            file.name;


        wrapper.appendChild(
            fileName
        );
    }


    container.appendChild(
        wrapper
    );
}


// ======================================================
// SIGNATURE
// ======================================================

function addSignature(
    container,
    name
) {

    const signature =
        document.createElement("div");

    signature.className =
        "signature";


    signature.textContent =
        name;


    container.appendChild(
        signature
    );
}


// ======================================================
// CLEAR PREVIEW
// ======================================================

function clearPreview() {

    const report =
        document.getElementById(
            "reportPreview"
        );

    report.innerHTML = "";

    report.style.display =
        "none";

}