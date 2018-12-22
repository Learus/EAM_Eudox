-- Universities - Departments --

Alter Table mydb.University AUTO_INCREMENT = 20000;

Insert into mydb.University (Name)
Values ('Εθνικό και Καποδιστριακό Πανεπιστήμιο Αθηνών');

Insert into mydb.University_Department (University_Id, Name)
Values ( 20000, 'Μουσικών Σπουδών'), ( 20000, 'Πληροφορικής και Τηλεπικοινωνιών' ), ( 20000, 'Εφαρμοσμένων Μαθηματικών και Φυσικών Επιστημών' );


Insert into mydb.University (Name)
Values ('Αριστοτέλειο Πανεπιστήμιο Θεσσαλονίκης');

Insert into mydb.University_Department (University_Id, Name)
Values ( 20001, 'Οικονομικών Επιστημών'), ( 20001, 'Κτηνιατρικής');

