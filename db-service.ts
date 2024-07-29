import { enablePromise, openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';
import { ToDoItem,share_page } from './src/models';
var SQLite = require('react-native-sqlite-storage');

const tableName = 'todoData';

enablePromise(true);
//------------------------------ECOEATSSTUFF----------------------------------
export const getEcoEatsDBConnection = async() =>{
  return SQLite.openDatabase({
    name: 'ecoeats.db', createFromLocation: '~www/ecoeats.db',
  }, () => { },);
}

export const getSharePage = async(db: SQLiteDatabase, type:number, keyword:string): Promise<share_page[]> =>{
  try{
    const sharePageItems: share_page[] = [];
    let query;
    if(keyword === ""){
      query = `SELECT * FROM Share WHERE type=${type}`;
    }else{
      query = `SELECT * FROM Share WHERE type=${type} AND title LIKE '%${keyword}%'`;
    }
    const results = await db.executeSql(query);
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        // result.rows.item(index).picture =  {uri:`file://${result.rows.item(index).picture}`};
        sharePageItems.push(result.rows.item(index))
      }
    });
    return sharePageItems;
  }catch(error){
    console.error(error);
    throw Error('Failed to get share pages items');
  }
};

export const saveNewShareItem = async(db: SQLiteDatabase, shareItem:share_page) => {
  const insertQuery = `INSERT INTO Share (type,title,tags,address,picture) VALUES` + 
  `(${shareItem.type}, '${shareItem.title}', '${shareItem.tags}', '${shareItem.address}', '${shareItem.picture}')`;

  return db.executeSql(insertQuery);
};

//-----------------------------TESTING STUFF-----------------------------------
//everytime you edit the db externally, you need to uninstall first then reinstall it.
export const getDBConnection = async () => {
  return SQLite.openDatabase({
    name: 'todo-data.db', createFromLocation: '~www/todo-data.db', },() => { },);
};

export const createTable = async (db: SQLiteDatabase) => {
  // create table if not exists
  const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
        value TEXT NOT NULL
    );`;

  await db.executeSql(query);
};

export const getTodoItems = async (db: SQLiteDatabase): Promise<ToDoItem[]> => {
  try {
    const todoItems: ToDoItem[] = [];
    const results = await db.executeSql(`SELECT rowid as id,value FROM ${tableName}`);
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        // result.rows.item(index)["picture"] =  require('./src/images/share1.png');
        todoItems.push(result.rows.item(index))
      }
    });
    return todoItems;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get todoItems !!!');
  }
};

export const saveTodoItems = async (db: SQLiteDatabase, todoItems: ToDoItem[]) => {
  const insertQuery =
    `INSERT OR REPLACE INTO ${tableName}(rowid, value) values` +
    todoItems.map(i => `(${i.id}, '${i.value}')`).join(',');

  return db.executeSql(insertQuery);
};

export const deleteTodoItem = async (db: SQLiteDatabase, id: number) => {
  const deleteQuery = `DELETE from ${tableName} where rowid = ${id}`;
  await db.executeSql(deleteQuery);
};

export const deleteTable = async (db: SQLiteDatabase) => {
  const query = `drop table ${tableName}`;

  await db.executeSql(query);
};