-- Universities - Departments --

Alter Table mydb.University AUTO_INCREMENT = 20000;
Alter Table mydb.University_Department AUTO_INCREMENT = 30000;
Alter Table mydb.Course AUTO_INCREMENT = 40000;

Insert into mydb.University (Name)
Values ('Εθνικό και Καποδιστριακό Πανεπιστήμιο Αθηνών');

Insert into mydb.University_Department (University_Id, Name)
Values ( 20000, 'Μουσικών Σπουδών'), ( 20000, 'Πληροφορικής και Τηλεπικοινωνιών' ), ( 20000, 'Εφαρμοσμένων Μαθηματικών και Φυσικών Επιστημών' );

Insert into mydb.Course (University_Department_Id, Name,  Semester, Professor_Name, Professor_Surname)
Values  (30000, 'Συνοπτική Ιστορία της Ευρωπαϊκής Μουσικής',        1, 'Ίρμγκαρντ',     'Λερχ'),
        (30000, 'Βυζαντινή Μουσικολογία',                           1, 'Αχιλλέας',      'Χαλδαιάκης'),
        (30000, 'Ηχοληψία για Σχολικές Μονάδες',                    4, 'Ιωάννης',       'Πεϊκίδης'),
        (30000, 'Φυσική και Μουσική Ακουστική',                     3, 'Αναστασία',     'Γεωργάκη'),
        (30000, 'Χορωδία και Διεύθυνση 2',                          8, 'Παύλος',        'Σεργίου'),
        (30001, 'Αντικειμενοστραφής Προγραμματισμός',               1, 'Ιζαμπώ',        'Καράλη'),
        (30001, 'Επικοινωνία Ανθρώπου Μηχανής',                     7, 'Μαρία',         'Ρούσσου'),
        (30001, 'Δομές Δεδομένων και Τεχνικές Προγραμματισμού',     2, 'Εμμανουήλ',     'Κουμπαράκης'),
        (30001, 'Προγραμματισμός Συστήματος',                       6, 'Μέμα',          'Ρουσσοπούλου'),
        (30001, 'Λογική Σχεδίαση',                                  1, 'Αντώνιος',      'Πασχάλης'),
        (30002, 'Μηχανική 1 (Στατική)',                             1, 'Βασιλική',      'Βαδαλουκά'),
        (30002, 'Εισαγωγή στον Αντικειμενοστραφή Προγραμματισμό',   1, 'Ιωάννης',       'Γάσπαρης'),
        (30002, 'Θερμοδυναμική',                                    3, 'Αλεξόπουλος',   'Θεόδωρος'),
        (30002, 'Άλγεβρα και Εφαρμογές',                            5, 'Φιλία',         'Βόντα'),
        (30002, 'Στοιχειώδη Σωματίδια 2',                           8, 'Αλέξανδρος',    'Γεωργακίλας');

Insert into mydb.University (Name)
Values ('Αριστοτέλειο Πανεπιστήμιο Θεσσαλονίκης');

Insert into mydb.University_Department (University_Id, Name)
Values ( 20001, 'Οικονομικών Επιστημών'), ( 20001, 'Κτηνιατρικής');

Insert into mydb.Course (University_Department_Id, Name, Semester, Professor_Name, Professor_Surname)
Values  (30003, 'Μικροοικονομική 1',                1, 'Ιωάννης',       'Βαρσακέλης'),
        (30003, 'Διοίκιση Επιχειρήσεων',            1, 'Αλέξανδρος',    'Διαμαντίδης'),
        (30003, 'Χρηματοοικονομική Λογιστική 1',    2, 'Γεώργιος',      'Παπαχρήστου'),
        (30003, 'Πολιτική Οικονομία',               4, 'Ιωάννης',       'Κυρίτσης'),
        (30003, 'Ελληνική Οικονομική Ιστορία',      5, 'Ευαγγελία',     'Δεσλή'),
        (30004, 'Φυσιολογία 1',                     1, 'Ιωάννης',       'Ταϊτζόγλου'),
        (30004, 'Βιολογία Ζώων και Φυτών',          1, 'Σπυρίδων',      'Κρήτας'),
        (30004, 'Γενική Ζωοτεχνία',                 2, 'Ηλίας',         'Γιάννενας'),
        (30004, 'Χειρουργική Ζώων Συντροφίας',      6, 'Αναστασία',     'Κομνηνού'),
        (30004, 'Παθολογία Πτηνών',                 6, 'Ιωάννα',        'Γεωργοπούλου');


-- Users --

Insert into mydb.User (Username, Email, Password, Type, Last_Login)
Values  ('brewknight', 'jmaliaras@gmail.com', 'password', 'Student', NOW() ),
        ('panospan', 'panospan@gmail.com', 'eimaimikros', 'Student', NOW() ),
        ('knossos', 'knossos.pub@gmail.com', 'xoxlious', 'PublDist',  NOW() ),
        ('kleidarithmos', 'kleidarithmos@otenet.gr', 'qwe123', 'Publisher', NOW() ),
        ('dituoa', 'secret@di.uoa.gr', 'secretpassword', 'Secretary', NOW() ),
        ('semfeuoa', 'secret@semfe.uoa.gr', 'secretpassowrd', 'Secretary', NOW() ),
        ('msduoa', 'secret@msd.uoa.gr', 'secretpassword', 'Secretary', NOW() ),
        ('ecostudauth', 'secret@eco.auth.gr', 'secretoassword', 'Secretary', NOW() ),
        ('vetauth', 'secret@vet.auth.gr', 'secretpassword', 'Secretary', NOW() ),
        ('ianos', 'ianos@gmail.com', 'ianospw', 'Distributor', NOW() ),
        ('papasotiriou', 'papasotiriou@hotmail.com', 'papassword', 'Distributor', NOW() );



Insert into mydb.Student (Username, Name, Surname, Phone, Student_Id, Personal_Id, University_Department_Id)
Values  ('brewknight', 'Ιωάννης', 'Μαλιάρας', '1234567890', '123456789012', 'ΑΒ123456', 30001),
        ('panospan', 'Παναγιώτης', 'Παναγόπουλος', '0987654321', '210987654321', 'ΒΑ654321', 30002);


Insert into mydb.Secretary (Username, University_Department_Id)
Values  ('dituoa', 30001), ('semfeuoa', 30002), ('msduoa', 30000),
        ('ecostudauth', 30003), ('vetauth', 30004);


Alter Table mydb.Address AUTO_INCREMENT 60000;

Insert into mydb.Address (City, ZipCode, Street_Name, Street_Number)
Values  ('Αθήνα', '10273', 'Κνωσσόυ', '15'),
        ('Αθήνα', '19328', 'Πεσμαζόγλου', '12'),
        ('Aθήνα', '19328', 'Σταδίου', '54'),
        ('Αθήνα', '19328', 'Πανεπιστημίου', '132'),
        ('Αθήνα', '16342', 'Ρήγα Φεραίου', '5');

Insert into mydb.Publisher (Username, Name, Phone, Address_Id)
Values  ('knossos', 'Εκδόσεις Κνωσσός', '2109784651', 60000),
        ('kleidarithmos', 'Εκδόσεις Κλειδάριθμος', '2106457894', 60001);


Alter Table mydb.Distribution_Point AUTO_INCREMENT 70000;

Insert into mydb.Distribution_Point (Owner, Name, Address_Id, Phone, Working_Hours)
Values  ('knossos', "Εκδόσεις Κνωσσός", 60000, '2109784651', 'ΔΕ - ΠΑ: 09:00 - 20:00'),
        ('ianos', "Βιβλιοπωλείο Ιανός", 60002, '2109950995', 'ΔΕ - ΠΑ: 09:00 - 20:00'),
        ('papasotiriou', "Παπασωτηρίου Πανεπιστήμιο", 60003, '2106457978', 'ΔΕ - ΣΑ: 09:00 - 20:00'),
        ('papasotiriou', "Παπασωτηρίου Ηλιούπολη", 60004, '2106457978', 'ΔΕ - ΠΑ: 09:00 - 17:00');

-- Textbooks --

Alter Table mydb.Textbook AUTO_INCREMENT 80000;

Insert into mydb.Textbook (Publisher_Username, Name, Writer, Date_Published, Last_Edited, Date_Added, Price, ISBN, Issue_Number)
Values  ('knossos', 'Η Μηχανική και Εγώ', 'Ιωάννης Ιωάννου', NOW(), NOW(), NOW(), 52.34, 1234567890, 1),
        ('kleidarithmos', 'Εισαγωγή στη Γλώσσα C', 'Παναγιώτης Σταματόπουλος', NOW(), NOW(), NOW(), 78.80, 0987654321, 3),
        ('kleidarithmos', 'Λογικός Προγραμματισμός', 'Παναγιώτης Σταματόπουλος', NOW(), NOW(), NOW(), 78.80, 0987654322, 5),
        ('kleidarithmos', 'Δομές Δεδομένων', 'Ιωάννης Σταυριώτης', NOW(), NOW(), NOW(), 28.00, 0987654323, 1),
        ('kleidarithmos', 'Ευρωπαϊκή Δομή', 'Ναπολέων Μαραβέγιας', NOW(), NOW(), NOW(), 108.80, 0987654324, 35),
        ('knossos', 'Η Μηχανική και Εσύ', 'Ιωάννης Ιωάννου', NOW(), NOW(), NOW(), 52.34, 1234567891, 1),
        ('knossos', 'Η Μηχανική και Εμείς', 'Ιωάννης Ιωάννου', NOW(), NOW(), NOW(), 52.34, 1234567892, 1),
        ('knossos', 'Η Μηχανική και Αυτοί', 'Ιωάννης Ιωάννου', NOW(), NOW(), NOW(), 52.34, 1234567893, 1);

Alter Table mydb.Keyword AUTO_INCREMENT 90000;

Insert into mydb.Keyword (Word)
Values ('Προγραμματισμός'), ('C'), ('Γλώσσα'), ('Μηχανική'), ('Εγώ'), ('Φρόυντ');

Insert into mydb.Textbook_has_Keyword (Textbook_Id, Keyword_Id)
Values (80000, 90003), (80000, 90004), (80000, 90005), (80001, 90000), (80001, 90001), (80001, 90002);


Insert into mydb.Distribution_Point_has_Textbook (Distribution_Point_Id, Textbook_Id, Copies)
Values (70000, 80000, 500), (70002, 80001, 431), (70003, 80001, 657);

-- Textbook Applications --

Insert into mydb.Textbook_Application (Date, Is_Current, PIN, Status)
Values  ('2016-3-11', 0, '0000000000000001', 'Completed'),
        ('2016-10-11', 0, '0000000000000002', 'Completed'),
        ('2017-3-11', 0, '0000000000000003', 'Completed'),
        ('2017-10-11', 0, '0000000000000004', 'Completed'),
        ('2018-3-11', 0, '0000000000000005', 'Completed'),
        ('2018-10-11', 1, '0000000000000006', 'Pending');

Insert into mydb.Textbook_Application_has_Textbook(Textbook_Application_Id, Textbook_Id)
Values  (1, 80000), (1, 80001),
        (2, 80002),
        (3, 80003),
        (4, 80004),
        (5, 80005), (5, 80006), (5, 80007);

Insert into mydb.Student_has_Textbook_Application(Textbook_Application_Id, Student_Username)
Values (1, 'brewknight'), (2, 'brewknight'), (3, 'brewknight'), (4, 'brewknight'), (5, 'brewknight');

-- Select c.*
-- From Course as c, University as u, University_Department as d
-- Where u.Id = d.University_Id and d.Id = c.University_Department_Id and d.Name = 'Μουσικών Σπουδών';

-- Select k.*
-- From Textbook as t, Distribution_Point as d, Distribution_Point_has_Textbook as dht, Keyword as k, Textbook_has_Keyword as thk
-- Where   d.Id = dht.Distribution_Point_id    and
--         dht.Textbook_Id = t.Id              and
--         k.Id = thk.Keyword_Id               and
--         t.id = thk.Textbook_Id;       