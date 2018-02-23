var express = require('express');
var app = express();
//var port = process.env.PORT || 8000; //odkomentarisati na production okruzenju
var port = 3000;
var osobeRouter = express.Router();
var StudentRouter = express.Router();
var bodyParser = require('body-parser');
var mysql = require('mysql');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//konekcija
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database:'nodejsvezba5'
});

////pretraga osoba po polu
//var osobePolPretraga = function (pol) {
//    var upitPretragaPol = 'SELECT * FROM osobe WHERE pol=?';
//    conn.query(upitPretragaPol, [pol], function (err, result, polja) {
//        if (err) {
//            console.log("Greska pri izvrsavanju upita");
//            return "500";
//        } else {
//            console.log(result);
//            return result;
//        }
//        conn.end(); //kraj rada sa bazom
//    });
//};



//prikaz svih osoba
osobeRouter.route('/Osobe').get(function (req, res) {
    var query = {};
    if (req.query.pol) {
        var upitPretragaPol = 'SELECT * FROM osobe WHERE pol=?';
        conn.query(upitPretragaPol, req.query.pol, function (err, result, polja) {
            if (err) {
                console.log("Greska pri izvrsavanju upita");
                res.status(500).send();
            } else {
                if (result.length == 0) {
                    console.log("Nema podataka");
                    res.status(404).send();
                } else {
                    console.log(result);
                    res.json(result);
                }
            }
        });
        conn.end(); //kraj rada sa bazom
    } else {
        var upitOsobe = 'SELECT * FROM osobe ';
        conn.query(upitOsobe,  function (err, result, polja) {
            if (err) {
                console.log("Greska pri izvrsavanju upita");
                res.status(500).send();
            } else {
                if (result.length == 0) {
                    console.log("Nema podataka");
                    res.status(404).send();
                } else {
                    console.log(result);
                    res.json(result);
                }
            }
        });
        conn.end(); //kraj rada sa bazom
    }    
});

osobeRouter.route('/Osobe/:id').get(function (req, res) {
    var id = req.params.id !== undefined ? parseInt(req.params.id) : null;
    if (id == null) {
        return res.status(500).send();
    } else {
        var upitPretragaPol = 'SELECT * FROM osobe WHERE id=?';
        conn.query(upitPretragaPol, id, function (err, result, polja) {
            if (err) {
                console.log("Greska pri izvrsavanju upita");
                res.status(500).send();
            } else {
                if (result.length == 0) {
                    console.log("Nema podataka");
                    res.status(404).send();
                } else {
                    console.log(result);
                    res.json(result);
                }
            }
        });
        conn.end(); //kraj rada sa bazom
    }
});


osobeRouter.route('/Osobe').post(function (req, res) {
    console.log(req.body);
    var podaci = [req.body.ime, req.body.prezime, req.body.pol];
    var insertQuery = "INSERT INTO osobe (ime, prezime,pol) VALUES(?,?,?)";
    conn.query(insertQuery, podaci , function (err, result, polja) {
        if (err) {
            console.log("Greska pri izvrsavanju upita");
            res.status(500).send();
        } else {
            console.log(result);
            res.status(201).send();
        }
        conn.end();
    });
});

osobeRouter.route('/Osobe/:id').patch(function (req, res) {
    console.log(req.body);
    var id = req.params.id !== undefined ? parseInt(req.params.id) : null;
    if (id == null ) {
        console.log("Nije prosledjen id ");
        return res.status(500).send();
    } else {
        var upitPretragaPol = 'SELECT * FROM osobe WHERE id=?';
        conn.query(upitPretragaPol, id, function (err, result, polja) {
            if (err) {
                console.log("Greska pri izvrsavanju upita");
                res.status(500).send();
            } else {
                if (result.length == 0) {
                    console.log("Nema podataka");
                    res.status(404).send();
                } else {
                    var UpitUpdate = "UPDATE osobe SET ime = ? WHERE id=?";
                    var podaci = [req.body.ime, id];
                    conn.query(UpitUpdate, podaci, function (err, result, polja) {
                        if (err) {
                            console.log("Greska pri izvrsavanju upita");
                            res.status(500).send();
                        } else {
                            console.log(result);
                            res.status(201).send();
                        }
                        conn.end();
                    });
                }
            }
        });
    }
});


osobeRouter.route('/Osobe/:id').put(function (req, res) {
    console.log(req.body);
    var id = req.params.id !== undefined ? parseInt(req.params.id) : null;
    if (id == null) {
        console.log("Nije prosledjen id ");
        return res.status(500).send();
    } else {
        var upitPretragaPol = 'SELECT * FROM osobe WHERE id=?';
        conn.query(upitPretragaPol, id, function (err, result, polja) {
            if (err) {
                console.log("Greska pri izvrsavanju upita");
                res.status(500).send();
            } else {
                if (result.length == 0) {
                    console.log("Nema podataka");
                    res.status(404).send();
                } else {
                    var UpitUpdate = "UPDATE osobe SET ime = ?, prezime=?, pol=? WHERE id=?";
                    var podaci = [req.body.ime, req.body.prezime, req.body.pol, id];
                    conn.query(UpitUpdate, podaci, function (err, result, polja) {
                        if (err) {
                            console.log("Greska pri izvrsavanju upita");
                            res.status(500).send();
                        } else {
                            console.log(result);
                            res.status(201).send();
                        }
                        conn.end();
                    });
                }
            }
        });
    }
});


osobeRouter.route('/Osobe/:id').delete(function (req, res) {
    var id = req.params.id !== undefined ? parseInt(req.params.id) : null;
    if (id == null) {
        console.log("Nije prosledjen id ");
        return res.status(500).send();
    } else {
        var upitPretragaPol = 'SELECT * FROM osobe WHERE id=?';
        conn.query(upitPretragaPol, id, function (err, result, polja) {
            if (err) {
                console.log("Greska pri izvrsavanju upita");
                res.status(500).send();
            } else {
                if (result.length == 0) {
                    console.log("Nema podataka");
                    res.status(404).send();
                } else {
                    var UpitUpdate = "DELETE FROM osobe WHERE id=?";           
                    conn.query(UpitUpdate, [id], function (err, result, polja) {
                        if (err) {
                            console.log("Greska pri izvrsavanju upita");
                            res.status(500).send();
                        } else {
                            console.log(result);
                            res.status(201).send();
                        }
                        conn.end();
                    });
                }
            }
        });
    }
});




//prikaz svih studenata ili filtrirano po smeru
StudentRouter.route('/Student').get(function (req, res) {
    var query = {};
    if (req.query.smer) {
        var studentismer = 'SELECT * FROM student s INNER JOIN smer sm on s.smerID=sm.id  WHERE smer=?';
        conn.query(studentismer, req.query.smer, function (err, result, polja) {
            if (err) {
                console.log("Greska pri izvrsavanju upita");
                res.status(500).send();
            } else {
                if (result.length == 0) {
                    console.log("Nema podataka");
                    res.status(404).send();
                } else {
                    console.log(result);
                    res.json(result);
                }
            }
            conn.end(); //kraj rada sa bazom
        });
    } else {
        var upitstudenti = 'SELECT * FROM student s INNER JOIN smer sm on s.smerID=sm.id ';
        conn.query(upitstudenti, function (err, result, polja) {
            if (err) {
                console.log("Greska pri izvrsavanju upita");
                res.status(500).send();
            } else {
                if (result.length == 0) {
                    console.log("Nema podataka");
                    res.status(404).send();
                } else {
                    console.log(result);
                    res.json(result);
                }
            }
        });
        conn.end(); 
    }
});

//prikaz studenta sa odredjenim ID-em
StudentRouter.route('/Student/:id').get(function (req, res) {
    var id = req.params.id !== undefined ? parseInt(req.params.id) : null;
    if (id == null) {
        return res.status(500).send();
    } else {
        var studentID = 'SELECT * FROM student s INNER JOIN smer sm on s.smerID=sm.id WHERE s.id=?';
        conn.query(studentID, id, function (err, result, polja) {
            if (err) {
                console.log("Greska pri izvrsavanju upita");
                res.status(500).send();
            } else {
                if (result.length == 0) {
                    console.log("Nema podataka");
                    res.status(404).send();
                } else {
                    console.log(result);
                    res.json(result);
                }
            }
            conn.end(); 
        });
    }
});

//nov unos
StudentRouter.route('/Student').post(function (req, res) {
    console.log(req.body);
    var smer = req.body.smer;
    var ime = req.body.ime;
    var prezime = req.body.prezime;
    var brind = req.body.brind;
    var datum = new Date("YYYY-MM-DD HH:MM:SS");
    

    var smerID = 'SELECT * FROM smer WHERE smer=?';
    conn.query(smerID, smer, function (err, resultsm, poljasm) {
        if (err) {
            console.log("Greska pri izvrsavanju upita");
            res.status(500).send();
        } else {
            if (resultsm.length == 0) {
                //nema navedeni smer, unosi se novi
                //result.insertId
                var podacismer = [smer, '1'];
                var insertsmer = "INSERT INTO smer (smer,status) VALUES(?,?)";
                conn.query(insertsmer, podacismer, function (err, result, polja) {
                    if (err) {
                        console.log("Greska pri izvrsavanju upita1");
                        res.status(500).send();
                    } else {
                        var smerID = result.insertId;
                        var podacistudent = [ime, prezime, brind, datum, datum,smerID];
                        var insertstudent = "INSERT INTO student (`ime`, `prezime`, `brojIndexa`, `datumUnosa`, `datumIzmene`, `smerID`) VALUES(?,?,?,?,?,?)";
                        conn.query(insertstudent, podacistudent, function (err, result, polja) {
                            if (err) {
                                console.log("Greska pri izvrsavanju upita2");
                                res.status(500).send();
                            } else {
                                console.log(result);
                                res.status(201).send();
                            }                     
                        });
                    }            
                });
            } else {
                //uzima se id smera i unosi se student
                var smerID = resultsm[0].id; 
                var podacistudent = [ime, prezime, brind, datum, datum, smerID];
                var insertstudent = "INSERT INTO student (`ime`, `prezime`, `brojIndexa`, `datumUnosa`, `datumIzmene`, `smerID`) VALUES(?,?,?,?,?,?)";
                conn.query(insertstudent, podacistudent, function (err, result, polja) {
                    if (err) {
                        //console.log(err);
                        res.status(500).send();
                    } else {
                        console.log(result);
                        res.status(201).send();
                    }
                });
            }
        }
    });
});

//delimicna izmena, izmena smera
StudentRouter.route('/Student/:id').patch(function (req, res) {
    var id = req.params.id !== undefined ? parseInt(req.params.id) : null;
    if (id == null) {
        console.log("Nije prosledjen id ");
        return res.status(500).send();
    } else {
        var studentid = 'SELECT * FROM student WHERE id=?';
        conn.query(studentid, id, function (err, result, polja) {
            if (err) {
                console.log("Greska pri izvrsavanju upita");
                res.status(500).send();
            } else {
                if (result.length == 0) {
                    console.log("Nema podataka");
                    res.status(404).send();
                } else {
                    //izmena

                    console.log(req.body);
    var smer = req.body.smer;
    var ime = req.body.ime;
    var prezime = req.body.prezime;
    var brind = req.body.brind;
    var datum = new Date("YYYY-MM-DD HH:MM:SS");
    

    var smerID = 'SELECT * FROM smer WHERE smer=?';
    conn.query(smerID, smer, function (err, resultsm, poljasm) {
        if (err) {
            console.log("Greska pri izvrsavanju upita");
            res.status(500).send();
        } else {
            if (resultsm.length == 0) {
                //nema navedeni smer, unosi se novi
                //result.insertId
                var podacismer = [smer, '1'];
                var insertsmer = "INSERT INTO smer (smer,status) VALUES(?,?)";
                conn.query(insertsmer, podacismer, function (err, result, polja) {
                    if (err) {
                        console.log("Greska pri izvrsavanju upita1");
                        res.status(500).send();
                    } else {
                        var smerID = result.insertId;
                        var UpitUpdate = "UPDATE student SET datumIzmene=?,smerID = ? WHERE id=?";
                        var podaci = [datum,smerID,id];
                        conn.query(UpitUpdate, podaci, function (err, result, polja) {
                            if (err) {
                                console.log("Greska pri izvrsavanju upita2");
                                res.status(500).send();
                            } else {
                                console.log(result);
                                res.status(201).send();
                            }                     
                        });
                    }            
                });
            } else {
                //uzima se id smera i unosi se student
                var smerID = resultsm[0].id; 
                var UpitUpdate = "UPDATE student SET datumIzmene=?,smerID = ? WHERE id=?";
                var podaci = [datum, smerID, id];
                conn.query(UpitUpdate, podaci, function (err, result, polja) {
                    if (err) {
                        //console.log(err);
                        res.status(500).send();
                    } else {
                        console.log(result);
                        res.status(201).send();
                    }
                });
            }
        }
    });


                }
            }
        });
    }
});

//izmena celog zapisa
StudentRouter.route('/Student/:id').put(function (req, res) {

});

//brisanje zapisa
StudentRouter.route('/Student/:id').delete(function (req, res) {
    var id = req.params.id !== undefined ? parseInt(req.params.id) : null;
    if (id == null) {
        console.log("Nije prosledjen id ");
        return res.status(500).send();
    } else {
        var studentid = 'SELECT * FROM student WHERE id=?';
        conn.query(studentid, id, function (err, result, polja) {
            if (err) {
                console.log("Greska pri izvrsavanju upita");
                res.status(500).send();
            } else {
                if (result.length == 0) {
                    console.log("Nema podataka");
                    res.status(404).send();
                } else {
                    var UpitUpdate = "DELETE FROM student WHERE id=?";
                    conn.query(UpitUpdate, [id], function (err, result, polja) {
                        if (err) {
                            console.log("Greska pri izvrsavanju upita");
                            res.status(500).send();
                        } else {
                            console.log(result);
                            res.status(201).send();
                        }
                        conn.end();
                    });
                }
            }
        });
    }
});



app.use('/api', StudentRouter);



app.use('/api', osobeRouter);

app.get('/', function (req, res) {
    res.send('Dobrodosli u API');
});

app.listen(port, function () {
    console.log('REST API radi na portu %s', port);
});