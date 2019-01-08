Select ta.Id, t.* 
From Textbook as t, Textbook_Application_has_Textbook as taht, Textbook_Application as ta, Student_has_Textbook_Application as shta
Where   ta.Id= shta.Textbook_Application_Id and 
        shta.Student_Username = 'brewknight' and
        taht.Textbook_Application_Id = ta.Id AND
        taht.Textbook_Id = t.Id
Group By ta.Id
-- Order By Date Desc
