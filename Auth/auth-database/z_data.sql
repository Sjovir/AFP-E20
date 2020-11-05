USE auth;

INSERT INTO Installation
    (id, name, address)
VALUES
    ("55e208bb-0a0d-11eb-ab61-0242ac120002", "Odense", "Odensevej 103, 5200 Odense M"),
    ("55e20a45-0a0d-11eb-ab61-0242ac120002", "Århus", "Århusvej 235, 8000 Århus C"),
    ("55e2046f-0a0d-11eb-ab61-0242ac120002", "Esbjerg", "Molen 116, 6000 Esbjerg V"),
    ("55e20aa3-0a0d-11eb-ab61-0242ac120002", "København", "Amagervej 899, 1200 København Ø");

INSERT INTO User
    (id, first_name, last_name, cpr, username, password_hash)
VALUES
    ("ab02de16-0a0d-11eb-b3a0-0242ac120002", "Kenny", "Kendrick", "1234567898", "kk", "$2a$10$HoOrAi5fVUazGA0nxKSxR.XsawvO8RXIvdEsv8ta5MUeeqk1NF2ee"); -- Kode: qwerqwer

INSERT INTO Role
    (id, title)
VALUES
    ("55e2f46d-0a0d-11eb-ab61-0242ac120002", "Admin"),
    ("55e2f663-0a0d-11eb-ab61-0242ac120002", "Secretary"),
    ("55e2f796-0a0d-11eb-ab61-0242ac120002", "Nurse");

INSERT INTO AccessRight
    (id, name, code)
VALUES
    ("55e2f802-0a0d-11eb-ab61-0242ac120002", "Admin", "ADMIN"),
    ("55e2f982-0a0d-11eb-ab61-0242ac120002", "See installations", "INSTALLATION:VIEW"),
    ("55e2f05b-0a0d-11eb-ab61-0242ac120002", "Edit installations", "INSTALLATION:EDIT"),
    ("55e2f7a5-0a0d-11eb-ab61-0242ac120002", "See users", "USER:VIEW"),
    ("55e2fe86-0a0d-11eb-ab61-0242ac120002", "Edit users", "USER:EDIT"),
    ("55e2fe22-0a0d-11eb-ab61-0242ac120002", "See citizens", "CITIZEN:VIEW"),
    ("55e2fe23-0a0d-11eb-ab61-0242ac120002", "Edit citizens", "CITIZEN:EDIT"),
    ("55e2fe24-0a0d-11eb-ab61-0242ac120002", "See journals", "JOURNAL:VIEW"),
    ("55e2fe25-0a0d-11eb-ab61-0242ac120002", "Edit journals", "JOURNAL:EDIT"),
    ("55e2fe26-0a0d-11eb-ab61-0242ac120002", "See medicine", "MEDICINE:VIEW"),
    ("55e2fe27-0a0d-11eb-ab61-0242ac120002", "Edit medicine", "MEDICINE:EDIT");

INSERT INTO Role_AccessRight
    (role_id, access_right_id)
VALUES
    ("55e2f46d-0a0d-11eb-ab61-0242ac120002", "55e2f802-0a0d-11eb-ab61-0242ac120002"),
    ("55e2f46d-0a0d-11eb-ab61-0242ac120002", "55e2f982-0a0d-11eb-ab61-0242ac120002"),
    ("55e2f46d-0a0d-11eb-ab61-0242ac120002", "55e2f05b-0a0d-11eb-ab61-0242ac120002"),
    ("55e2f663-0a0d-11eb-ab61-0242ac120002", "55e2f982-0a0d-11eb-ab61-0242ac120002"),
    ("55e2f663-0a0d-11eb-ab61-0242ac120002", "55e2f7a5-0a0d-11eb-ab61-0242ac120002"),
    ("55e2f663-0a0d-11eb-ab61-0242ac120002", "55e2fe86-0a0d-11eb-ab61-0242ac120002"),
    ("55e2f663-0a0d-11eb-ab61-0242ac120002", "55e2fe22-0a0d-11eb-ab61-0242ac120002"),
    ("55e2f796-0a0d-11eb-ab61-0242ac120002", "55e2f982-0a0d-11eb-ab61-0242ac120002"),
    ("55e2f796-0a0d-11eb-ab61-0242ac120002", "55e2f7a5-0a0d-11eb-ab61-0242ac120002"),
    ("55e2f796-0a0d-11eb-ab61-0242ac120002", "55e2fe22-0a0d-11eb-ab61-0242ac120002"),
    ("55e2f796-0a0d-11eb-ab61-0242ac120002", "55e2fe23-0a0d-11eb-ab61-0242ac120002"),
    ("55e2f796-0a0d-11eb-ab61-0242ac120002", "55e2fe24-0a0d-11eb-ab61-0242ac120002"),
    ("55e2f796-0a0d-11eb-ab61-0242ac120002", "55e2fe25-0a0d-11eb-ab61-0242ac120002"),
    ("55e2f796-0a0d-11eb-ab61-0242ac120002", "55e2fe26-0a0d-11eb-ab61-0242ac120002"),
    ("55e2f796-0a0d-11eb-ab61-0242ac120002", "55e2fe27-0a0d-11eb-ab61-0242ac120002");

INSERT INTO Installation_Role
    (id, installation_id, role_id)
VALUES
    ("55e20ba1-0a0d-11eb-ab61-0242ac120002", "55e208bb-0a0d-11eb-ab61-0242ac120002", "55e2f46d-0a0d-11eb-ab61-0242ac120002"),
    ("55e20ba2-0a0d-11eb-ab61-0242ac120002", "55e208bb-0a0d-11eb-ab61-0242ac120002", "55e2f663-0a0d-11eb-ab61-0242ac120002"),
    ("55e20ba3-0a0d-11eb-ab61-0242ac120002", "55e208bb-0a0d-11eb-ab61-0242ac120002", "55e2f796-0a0d-11eb-ab61-0242ac120002"),
    ("55e20ba4-0a0d-11eb-ab61-0242ac120002", "55e20a45-0a0d-11eb-ab61-0242ac120002", "55e2f46d-0a0d-11eb-ab61-0242ac120002"),
    ("55e20ba5-0a0d-11eb-ab61-0242ac120002", "55e20a45-0a0d-11eb-ab61-0242ac120002", "55e2f663-0a0d-11eb-ab61-0242ac120002"),
    ("55e20ba6-0a0d-11eb-ab61-0242ac120002", "55e20a45-0a0d-11eb-ab61-0242ac120002", "55e2f796-0a0d-11eb-ab61-0242ac120002"),
    ("55e20ba7-0a0d-11eb-ab61-0242ac120002", "55e20aa3-0a0d-11eb-ab61-0242ac120002", "55e2f46d-0a0d-11eb-ab61-0242ac120002"),
    ("55e20bd1-0a0d-11eb-ab61-0242ac120002", "55e20aa3-0a0d-11eb-ab61-0242ac120002", "55e2f663-0a0d-11eb-ab61-0242ac120002"),
    ("55e20bd2-0a0d-11eb-ab61-0242ac120002", "55e20aa3-0a0d-11eb-ab61-0242ac120002", "55e2f796-0a0d-11eb-ab61-0242ac120002");

INSERT INTO Installation_User
    (id, installation_id, user_id)
VALUES
    ("e822f2c4-0a0d-11eb-b3a0-0242ac120002", "55e208bb-0a0d-11eb-ab61-0242ac120002", "ab02de16-0a0d-11eb-b3a0-0242ac120002"),
    ("f088db14-0a0d-11eb-b3a0-0242ac120002", "55e20a45-0a0d-11eb-ab61-0242ac120002", "ab02de16-0a0d-11eb-b3a0-0242ac120002"),
    ("a088d85c-0a0d-11eb-b3a0-0242ac120002", "55e20aa3-0a0d-11eb-ab61-0242ac120002", "ab02de16-0a0d-11eb-b3a0-0242ac120002");

INSERT INTO Installation_User_Role
    (installation_user_id, installation_role_id)
VALUES
    ("e822f2c4-0a0d-11eb-b3a0-0242ac120002", "55e20ba3-0a0d-11eb-ab61-0242ac120002"),
    ("f088db14-0a0d-11eb-b3a0-0242ac120002", "55e20ba5-0a0d-11eb-ab61-0242ac120002"),
    ("a088d85c-0a0d-11eb-b3a0-0242ac120002", "55e20ba7-0a0d-11eb-ab61-0242ac120002");
