INSERT INTO Installation
    (id, name, address)
VALUES
    ("55e208bb-0a0d-11eb-ab61-0242ac120002", "Odense", "Odensevej 103, 5200 Odense M"),
    ("55e20a45-0a0d-11eb-ab61-0242ac120002", "Århus", "Århusvej 235, 8000 Århus C"),
    ("55e2046f-0a0d-11eb-ab61-0242ac120002", "Esbjerg", "Molen 116, 6000 Esbjerg V"),
    ("55e20aa3-0a0d-11eb-ab61-0242ac120002", "København", "Amagervej 899, 1200 København Ø");

INSERT INTO Citizen
    (id, first_name, last_name, cpr)
VALUES
    ("55e20ff1-0a0d-11eb-ab61-0242ac120002", "Obi One", "Kenobi", "1508771599"),
    ("55e20ff2-0a0d-11eb-ab61-0242ac120002", "Luke", "Skywalker", "0202931685"),
    ("55e20ff3-0a0d-11eb-ab61-0242ac120002", "Darth", "Vader", "0711856583"),
    ("55e20ff4-0a0d-11eb-ab61-0242ac120002", "Princess", "Leia", "0202932524"),
    ("55e20ff5-0a0d-11eb-ab61-0242ac120002", "Han", "Solo", "2705908405"),
    ("55e20ff6-0a0d-11eb-ab61-0242ac120002", "Mr.", "C-3PO", "0101719001"),
    ("55e20ff7-0a0d-11eb-ab61-0242ac120002", "Mr.", "R2D2", "0101719000"),
    ("55e20ff8-0a0d-11eb-ab61-0242ac120002", "Anakin", "Skywalker", "0711856585"),
    ("55e20ff9-0a0d-11eb-ab61-0242ac120002", "Jabba", "the Hut", "0208651249"),
    ("55e20f10-0a0d-11eb-ab61-0242ac120002", "Boba", "Fett", "0208821249");

INSERT INTO CitizenInstallation
    (id, citizen_id, installation_id)
VALUES
    ("55e20ba1-0a0d-11eb-ab61-0242ac120002", "55e20ff1-0a0d-11eb-ab61-0242ac120002", "55e208bb-0a0d-11eb-ab61-0242ac120002"),
    ("55e20ba2-0a0d-11eb-ab61-0242ac120002", "55e20ff2-0a0d-11eb-ab61-0242ac120002", "55e208bb-0a0d-11eb-ab61-0242ac120002"),
    ("55e20ba3-0a0d-11eb-ab61-0242ac120002", "55e20ff7-0a0d-11eb-ab61-0242ac120002", "55e208bb-0a0d-11eb-ab61-0242ac120002"),
    ("55e20baa-0a0d-11eb-ab61-0242ac120002", "55e20ff2-0a0d-11eb-ab61-0242ac120002", "55e20a45-0a0d-11eb-ab61-0242ac120002"),
    ("55e20ba4-0a0d-11eb-ab61-0242ac120002", "55e20ff3-0a0d-11eb-ab61-0242ac120002", "55e20a45-0a0d-11eb-ab61-0242ac120002"),
    ("55e20ba5-0a0d-11eb-ab61-0242ac120002", "55e20ff4-0a0d-11eb-ab61-0242ac120002", "55e20a45-0a0d-11eb-ab61-0242ac120002"),
    ("55e20ba6-0a0d-11eb-ab61-0242ac120002", "55e20ff5-0a0d-11eb-ab61-0242ac120002", "55e20a45-0a0d-11eb-ab61-0242ac120002"),
    ("55e20ba7-0a0d-11eb-ab61-0242ac120002", "55e20ff6-0a0d-11eb-ab61-0242ac120002", "55e2046f-0a0d-11eb-ab61-0242ac120002"),
    ("55e20bd1-0a0d-11eb-ab61-0242ac120002", "55e20ff8-0a0d-11eb-ab61-0242ac120002", "55e2046f-0a0d-11eb-ab61-0242ac120002"),
    ("55e20bd2-0a0d-11eb-ab61-0242ac120002", "55e20ff9-0a0d-11eb-ab61-0242ac120002", "55e2046f-0a0d-11eb-ab61-0242ac120002"),
    ("55e20bd3-0a0d-11eb-ab61-0242ac120002", "55e20f10-0a0d-11eb-ab61-0242ac120002", "55e20a45-0a0d-11eb-ab61-0242ac120002");
