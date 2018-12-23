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

Insert into mydb.User (Username, Email, Password, Type, Last_Login)
Values  ('brewknight', 'jmaliaras@gmail.com', 'password', 'Stud', NOW() ),
        ('panospan', 'panospan@gmail.com', 'eimaimikros', 'Stud', NOW() ),
        ('knossos', 'knossos.pub@gmail.com', 'xoxlious', 'PublDist',  NOW() ),
        ('kleidarithmos', 'kleidarithmos@otenet.gr', 'qwe123', 'Publ', NOW() ),
        ('dituoa', 'secret@di.uoa.gr', 'secretpassword', 'Secr', NOW() ),
        ('semfeuoa', 'secret@semfe.uoa.gr', 'secretpassowrd', 'Secr', NOW() ),
        ('msduoa', 'secret@msd.uoa.gr', 'secretpassword', 'Secr', NOW() ),
        ('ecostudauth', 'secret@eco.auth.gr', 'secretoassword', 'Secr', NOW() ),
        ('vetauth', 'secret@vet.auth.gr', 'secretpassword', 'Secr', NOW() ),
        ('ianos', 'ianos@gmail.com', 'ianospw', 'Dist', NOW() ),
        ('papasotiriou', 'papasotiriou@hotmail.com', 'papassword', 'Dist', NOW() );



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

Insert into mydb.Distribution_Point (Owner, Address_Id, Phone, Working_Hours)
Values  ('knossos', 60000, '2109784651', 'ΔΕ - ΠΑ: 09:00 - 20:00'),
        ('ianos', 60002, '2109950995', 'ΔΕ - ΠΑ: 09:00 - 20:00'),
        ('papasotiriou', 60003, '2106457978', 'ΔΕ - ΣΑ: 09:00 - 20:00'),
        ('papasotiriou', 60004, '2106457978', 'ΔΕ - ΠΑ: 09:00 - 17:00');

Select * From mydb.Publisher;
Select * From mydb.Secretary;
Select * From mydb.Student;
Select * From mydb.Distribution_Point;
Select * From mydb.User;

Select c.Id, c.Name, s.Username 
From Course as c, Secretary as s, University_Department as ud
Where   s.University_Department_Id = ud.Id and 
        c.University_Department_Id = ud.Id AND
        s.Username = 'dituoa';