import React from 'react';

import { openDatabase } from 'react-native-sqlite-storage';



const db = openDatabase({ name: 'station.db', location: 'default' });
var tableName="stations";
console.log('database is' +db)
//method returns a Promise - in the calling side .then(...).then(...)....catch(...) can be used
export const init=()=>{
    const promise=new Promise((resolve, reject)=>{
        db.transaction((tx)=>{
            //tx.executeSql('DROP TABLE IF EXISTS fish', []); //uncomment this if needed - sometimes it is good to empty the table
            tx.executeSql('DROP TABLE IF EXISTS station', []); //uncomment this if needed - sometimes it is good to empty the table
            //By default, primary key is auto_incremented - we do not add anything to that column
            //SQLite supports only int values as booleans
            tx.executeSql('create table if not exists '+tableName+'(id integer not null primary key autoincrement, name text not null, shortCode text not null unique, lat real not null, lon real not null, favourite int);',
            [],//second parameters of execution:empty square brackets - this parameter is not needed when creating table
            //If the transaction succeeds, this is called
            ()=>{
                resolve();//There is no need to return anything
            },
            //If the transaction fails, this is called
            (_,err)=>{
                reject(err);
            }
            );
        });
    });
    return promise;
};


/**
 * 
 * Pass station object with (name, shortCode, location[x,y], favourite)
 */
export const addStation=(station)=>{
    const promise=new Promise((resolve, reject)=>{
        db.transaction((tx)=>{

            
            //Here we use the Prepared statement, just putting placeholders to the values to be inserted
            tx.executeSql('insert into '+tableName+' (name, shortCode, lat, lon, favourite) values (?,?,?,?,?);'),

            //And the values come here
            // Sends the station object with 
            [station.name, station.shortCode, station.location[1], station.location[0], station.favourite],
            //If the transaction succeeds, this is called
            ()=>{
                console.log(station.name+ station.shortCode+ station.location[1]+ station.location[0]+ station.favourite)
                resolve();
            },
            //If the transaction fails, this is called
            (_,err)=>{
                console.log(err)
                reject(err);
            }
    });
        });

    return promise;
};

/**
 * 
 * Update favourite value from the station
 */
export const updateStation=(shortCode, favouriteBool)=>{
    const promise=new Promise((resolve, reject)=>{
        db.transaction((tx)=>{
            //Here we use the Prepared statement, just putting placeholders to the values to be inserted
            tx.executeSql('update '+tableName+' set favourite=? where shortCode=?;',

                
            //And the values come here
            [+favouriteBool, shortCode],
            //If the transaction succeeds, this is called
            ()=>{
                resolve();
            },
            //If the transaction fails, this is called
            (_,err)=>{
                reject(err);
            }
            
    )});
    });
    return promise;
};

export const deleteStation=(shortCode)=>{
    const promise=new Promise((resolve, reject)=>{
        db.transaction((tx)=>{
            //Here we use the Prepared statement, just putting placeholders to the values to be inserted
            tx.executeSql('delete from '+tableName+' where shortCode=?;',
            //And the values come here
            [shortCode],
            //If the transaction succeeds, this is called
            ()=>{
                    resolve();
            },
            //If the transaction fails, this is called
            (_,err)=>{
                reject(err);
            }
            );
        });
    });
    return promise;
};

export const fetchAllStations=()=>{
    const promise=new Promise((resolve, reject)=>{
        db.transaction((tx)=>{
            //Here we select all from the table station
            tx.executeSql('select * from '+tableName + ';', [],
                (tx, result)=>{
                    let items=[];//Create a new empty Javascript array
                    //And add all the items of the result (database rows/records) into that table
                    for (let i = 0; i < result.rows.length; i++){
                        items.push(result.rows.item(i));//The form of an item is {"breed": "Pike", "id": 1, "weight": 5000}
                        console.log(result.rows.item(i));//For debugging purposes to see the data in console window
                    }
                    console.log('select name from '+tableName + ';');//For debugging purposes to see the data in console window
                    resolve(items);//The data the Promise will have when returned
                },
                (tx,err)=>{
                    console.log("Err");
                    console.log(err);
                    reject(err);
                }
            );
        });
    });
    return promise;
};
