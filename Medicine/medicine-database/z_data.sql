USE medicine;

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

INSERT INTO Drug
    (id, name, code)
VALUES
    ("3dd39dbf-9bba-4637-b3e4-f7965a56dd21", "Morphin", "DB00295"),
    ("c758cc68-e61a-4abb-b64b-6e97b077b011", "Panodil", "DB00316"),
    ("5d8f4e1e-0a48-42ac-ab30-df4e162319b7", "Methadon", "DB00333"),
    ("5d4ee398-2b56-4fae-9ff2-684efec2346e", "Aspirin", "DB00945");

INSERT INTO Ordination
    (id, drug_id, drug_amount, drug_unit, start_date, end_date)
VALUES
    ("60f9509d-479a-4f5a-8e8d-78cf9477f8d4", "3dd39dbf-9bba-4637-b3e4-f7965a56dd21", 5, "mg", "2020-10-28 08:30:00", null),
    ("01bba197-889c-4430-9d47-f0c2cc2ee837", "5d8f4e1e-0a48-42ac-ab30-df4e162319b7", 15, "mg", "2020-10-19 08:30:00", "2020-11-23 15:40:00"),
    ("d0457835-eab2-4737-acf1-97173359353b", "c758cc68-e61a-4abb-b64b-6e97b077b011", 1, "g", "2020-10-20 08:30:00", "2020-11-23 15:40:00"),
    ("8c87f9fa-6aa8-42fc-9476-bac144eff366", "5d4ee398-2b56-4fae-9ff2-684efec2346e", 200, "mg", "2020-08-15 08:30:00", "2020-12-23 20:50:00");

INSERT INTO Citizen_Ordination
    (id, citizen_id, ordination_id)
VALUES
    ("2993cc38-fad5-4269-a586-c35af3540a8a", "55e20ff1-0a0d-11eb-ab61-0242ac120002", "60f9509d-479a-4f5a-8e8d-78cf9477f8d4"),
    ("7d7688ef-0e97-420c-b299-dd5de09eccc4", "55e20ff1-0a0d-11eb-ab61-0242ac120002", "01bba197-889c-4430-9d47-f0c2cc2ee837"),
    ("53e376fc-30ef-4c5e-941f-d92eb1445f98", "55e20ff5-0a0d-11eb-ab61-0242ac120002", "d0457835-eab2-4737-acf1-97173359353b"),
    ("504f9a70-6a5e-47ff-ba81-97e6ad9075f9", "55e20ff5-0a0d-11eb-ab61-0242ac120002", "8c87f9fa-6aa8-42fc-9476-bac144eff366");
