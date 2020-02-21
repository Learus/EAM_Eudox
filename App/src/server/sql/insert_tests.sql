-- Universities - Departments --
Use sdi1500084;

Alter Table sdi1500084.University AUTO_INCREMENT = 20000;
Alter Table sdi1500084.University_Department AUTO_INCREMENT = 30000;
Alter Table sdi1500084.Course AUTO_INCREMENT = 40000;

Insert into sdi1500084.University (Name)
Values ('Εθνικό και Καποδιστριακό Πανεπιστήμιο Αθηνών');

Insert into sdi1500084.University_Department (University_Id, Name)
Values ( 20000, 'Μουσικών Σπουδών'), ( 20000, 'Πληροφορικής και Τηλεπικοινωνιών' ), ( 20000, 'Εφαρμοσμένων Μαθηματικών και Φυσικών Επιστημών' );

Insert into sdi1500084.Course (University_Department_Id, Name,  Semester, Professor_Name, Professor_Surname)
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
        (30001, 'Εισαγωγή στον Προγραμματισμό',                     1, 'Παναγιώτης',    'Σταματόπουλος'),
        (30001, 'Δομή και Θεσμοί της Ευρωπαϊκής Ένωσης',            7, 'Γκουστάβο',     'Τολίδης'),
        (30002, 'Μηχανική 1 (Στατική)',                             1, 'Βασιλική',      'Βαδαλουκά'),
        (30002, 'Εισαγωγή στον Αντικειμενοστραφή Προγραμματισμό',   1, 'Ιωάννης',       'Γάσπαρης'),
        (30002, 'Θερμοδυναμική',                                    3, 'Αλεξόπουλος',   'Θεόδωρος'),
        (30002, 'Άλγεβρα και Εφαρμογές',                            5, 'Φιλία',         'Βόντα'),
        (30002, 'Στοιχειώδη Σωματίδια 2',                           8, 'Αλέξανδρος',    'Γεωργακίλας');

Insert into sdi1500084.University (Name)
Values ('Αριστοτέλειο Πανεπιστήμιο Θεσσαλονίκης');

Insert into sdi1500084.University_Department (University_Id, Name)
Values ( 20001, 'Οικονομικών Επιστημών'), ( 20001, 'Κτηνιατρικής');

Insert into sdi1500084.Course (University_Department_Id, Name, Semester, Professor_Name, Professor_Surname)
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

Insert into sdi1500084.User (Username, Email, Password, Type, Last_Login)
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



Insert into sdi1500084.Student (Username, Name, Surname, Phone, Student_Id, Personal_Id, University_Department_Id)
Values  ('brewknight', 'Ιωάννης', 'Μαλιάρας', '1234567890', '123456789012', 'ΑΒ123456', 30001),
        ('panospan', 'Παναγιώτης', 'Παναγόπουλος', '0987654321', '210987654321', 'ΒΑ654321', 30002);


Insert into sdi1500084.Secretary (Username, University_Department_Id)
Values  ('dituoa', 30001), ('semfeuoa', 30002), ('msduoa', 30000),
        ('ecostudauth', 30003), ('vetauth', 30004);


Alter Table sdi1500084.Address AUTO_INCREMENT 60000;

Insert into sdi1500084.Address (City, ZipCode, Street_Name, Street_Number)
Values  ('Αθήνα', '11253', 'Κνωσσόυ', '15'),
        ('Αθήνα', '10564', 'Πεσμαζόγλου', '12'),
        ('Αθήνα', '10564', 'Σταδίου', '54'),
        ('Αθήνα', '10564', 'Πανεπιστημίου', '132'),
        ('Αθήνα', '16345', 'Ρήγα Φεραίου', '5');

Insert into sdi1500084.Publisher (Username, Name, Phone, Address_Id)
Values  ('knossos', 'Εκδόσεις Κνωσσός', '2109784651', 60000),
        ('kleidarithmos', 'Εκδόσεις Κλειδάριθμος', '2106457894', 60001);


Alter Table sdi1500084.Distribution_Point AUTO_INCREMENT 70000;

Insert into sdi1500084.Distribution_Point (Owner, Name, Address_Id, Phone, Working_Hours)
Values  ('knossos', "Εκδόσεις Κνωσσός", 60000, '2109784651', 'ΔΕ - ΠΑ: 09:00 - 20:00'),
        ('ianos', "Βιβλιοπωλείο Ιανός", 60002, '2109950995', 'ΔΕ - ΠΑ: 09:00 - 20:00'),
        ('papasotiriou', "Παπασωτηρίου Πανεπιστήμιο", 60003, '2106457978', 'ΔΕ - ΣΑ: 09:00 - 20:00'),
        ('papasotiriou', "Παπασωτηρίου Ηλιούπολη", 60004, '2106457978', 'ΔΕ - ΠΑ: 09:00 - 17:00');

-- Textbooks --

Alter Table sdi1500084.Textbook AUTO_INCREMENT 80000;

Insert into sdi1500084.Textbook (Publisher_Username, Name, Writer, Date_Published, Last_Edited, Date_Added, Price, ISBN, Issue_Number)
Values  ('knossos', 'Η Μηχανική και Εγώ', 'Ιωάννης Ιωάννου', NOW(), NOW(), NOW(), 52.34, 1234567880, 1),
        ('kleidarithmos', 'Εισαγωγή στη Γλώσσα C', 'Παναγιώτης Σταματόπουλος', NOW(), NOW(), NOW(), 78.80, 1234567881, 3),
        ('kleidarithmos', 'Λογικός Προγραμματισμός', 'Παναγιώτης Σταματόπουλος', NOW(), NOW(), NOW(), 78.80, 1234567882, 5),
        ('kleidarithmos', 'Δομές Δεδομένων', 'Ιωάννης Σταυριώτης', NOW(), NOW(), NOW(), 28.00, 1234567883, 1),
        ('kleidarithmos', 'Ευρωπαϊκή Δομή', 'Ναπολέων Μαραβέγιας', NOW(), NOW(), NOW(), 108.80, 1234567884, 35),
        ('kleidarithmos', 'Εισαγωγή στην Ευχρηστία Υπολογιστών και Εμπειρία Χρήστη', 'Μιράντα Παππαδοπούλου', NOW(), NOW(), NOW(), 78.80, 1234567885, 1),
        ('kleidarithmos', 'C++ 11', 'Bjarne Stroustroup', NOW(), NOW(), NOW(), 118.00, 1234567886, 9),
        ('knossos', 'C++ 17', 'Bjarne Stroustroup', NOW(), NOW(), NOW(), 120.00, 1234567887, 3),
        ('kleidarithmos', 'Το Μαγικό Σχολικό στους Χάρτες Καρνό', 'Πολυπλέκτιος Τρισήμονος', NOW(), NOW(), NOW(), 10.00, 1234567888, 1),
        ('kleidarithmos', 'Πολυπλέκτης 3 σε 1: Τί είναι επιτέλους;', 'Πολυπλέκτιος Τρισήμονος', NOW(), NOW(), NOW(), 5.00, 1234567889, 1),
        ('kleidarithmos', 'Unix Programming', 'Tannenbaum', NOW(), NOW(), NOW(), 50.00, 1234567890, 5),
        ('knossos', 'Η Μηχανική και Εσύ', 'Ιωάννης Ιωάννου', NOW(), NOW(), NOW(), 52.34, 1234567891, 1),
        ('knossos', 'Η Μηχανική και Εμείς', 'Ιωάννης Ιωάννου', NOW(), NOW(), NOW(), 52.34, 1234567892, 1),
        ('knossos', 'Η Μηχανική και Αυτοί', 'Ιωάννης Ιωάννου', NOW(), NOW(), NOW(), 52.34, 1234567893, 1),
        ('knossos', 'Οι κίνδυνοι των Social Media στη σύγχρονη εποχή', 'Κινδύνιος Δεισιδαίμων', NOW(), NOW(), NOW(), 100.00, 1234567894, 1);

Insert into sdi1500084.Course_has_Textbook (Course_Id, Textbook_Id)
Values  (40005, 80006), (40005, 80007), /*Αντικειμενοστραφής*/
        (40006, 80005), /*ΕΑΜ*/
        (40007, 80003), /*Δομες*/
        (40008, 80010), /*Syspro*/
        (40009, 80008), (40009, 80009), /*Λογικη Σχεδιαση*/
        (40010, 80001), /*Εισαγωγη στον Προγραμματισμό*/
        (40011, 80004); /*Δομή και Θεσμοί*/

Alter Table sdi1500084.Keyword AUTO_INCREMENT 90000;

Insert into sdi1500084.Keyword (Word)
Values  ('Προγραμματισμός'), ('C'), ('Γλώσσα'), ('Μηχανική'), ('Εγώ'), ('Φρόυντ'), ('Εμείς'), ('Εσύ'), ('Αυτοί'), 
        ('Social Media'), ('Social'), ('Media'), ('Κίνδυνοι'), ('Σύγχρονη Εποχή');

Insert into sdi1500084.Textbook_has_Keyword (Textbook_Id, Keyword_Id)
Values  (80000, 90003), (80012, 90003), (80013, 90003), (80011, 90003),
        (80000, 90004), (80000, 90005), (80001, 90000), (80001, 90001), 
        (80001, 90002), (80012, 90006), (80011, 90007), (80013, 90008), 
        (80014, 90009), (80014, 90010), (80014, 90011), (80014, 90012), 
        (80014, 90013);


Insert into sdi1500084.Distribution_Point_has_Textbook (Distribution_Point_Id, Textbook_Id, Copies)
Values  (70000, 80000, 500), (70002, 80001, 431), (70000, 80014, 1000),
        (70001, 80002, 300), (70001, 80003, 300), (70000, 80004, 300),
        (70002, 80005, 300), (70001, 80006, 300),
        (70000, 80007, 300), (70002, 80008, 300), (70003, 80009, 300),
        (70001, 80010, 300), (70000, 80011, 500), (70000, 80012, 500), (70000, 80013, 500);

-- Textbook Applications --

Insert into sdi1500084.Textbook_Application (Date, Is_Current, PIN, Status)
Values  ('2016-3-11', 0, '0000000000000001', 'Completed'),
        ('2016-10-11', 0, '0000000000000002', 'Completed'),
        ('2017-3-11', 0, '0000000000000003', 'Completed'),
        ('2017-10-11', 0, '0000000000000004', 'Completed'),
        ('2010-3-10', 1, '0000000000000005', 'Pending'),
        ('2011-3-10', 0, '0000000000000005', 'Completed'),
        ('2012-3-10', 0, '0000000000000005', 'Completed'),
        ('2013-3-10', 0, '0000000000000005', 'Completed'),
        ('2014-3-10', 0, '0000000000000005', 'Completed');

Insert into sdi1500084.Textbook_Application_has_Textbook(Textbook_Application_Id, Textbook_Id, Taken)
Values  (1, 80000, TRUE), (1, 80001, TRUE),
        (2, 80002, TRUE),
        (3, 80003, TRUE),
        (4, 80004, TRUE),
        (5, 80005, TRUE), (5, 80006, TRUE), (5, 80008, FALSE);

Insert into sdi1500084.Student_has_Textbook_Application(Textbook_Application_Id, Student_Username)
Values (1, 'brewknight'), (2, 'brewknight'), (3, 'brewknight'), (4, 'brewknight'), (5, 'brewknight'),
    (6, 'brewknight'),(7, 'brewknight'), (8, 'brewknight'), (9, 'brewknight');

-- Select c.*
-- From Course as c, University as u, University_Department as d
-- Where u.Id = d.University_Id and d.Id = c.University_Department_Id and d.Name = 'Μουσικών Σπουδών';

-- Select k.*
-- From Textbook as t, Distribution_Point as d, Distribution_Point_has_Textbook as dht, Keyword as k, Textbook_has_Keyword as thk
-- Where   d.Id = dht.Distribution_Point_id    and
--         dht.Textbook_Id = t.Id              and
--         k.Id = thk.Keyword_Id               and
--         t.id = thk.Textbook_Id;       