import { enablePromise, openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';
import { ToDoItem,explore_page, share_page,request_page,userD, deal_page,comment } from './src/models';

var SQLite = require('react-native-sqlite-storage');

const tableName = 'todoData';

enablePromise(true);
//------------------------------ECOEATSSTUFF----------------------------------

export const getEcoEatsDBConnection = async() => {
  return SQLite.openDatabase({
    name: 'ecoeats.db',
    createFromLocation: '~www/ecoeats.db',
  }, () => { },);
};


//Share and Explore related stuffs
export const getSharePage = async(db: SQLiteDatabase, type:number | undefined, keyword:string , id:string | undefined): Promise<share_page[]> =>{
  try{
    const sharePageItems: share_page[] = [];
    let query;
    if(keyword === ""){
      query = `SELECT * FROM Share WHERE type=${type}`;
    }else{
      query = `SELECT * FROM Share WHERE type=${type} AND title LIKE '%${keyword}%'`;
    }

    if(id){
      query = `SELECT * FROM Share WHERE share_id IN (${id})`;
    }
    const results = await db.executeSql(query);
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        sharePageItems.push(result.rows.item(index))
      }
    });
    return sharePageItems;
  }catch(error){
    console.error(error);
    throw Error('Failed to get share pages items');
  }
};

export const getRequestPage = async(db:SQLiteDatabase, id:number):Promise<request_page> => {
  try{
    const [results] = await db.executeSql(`SELECT * FROM Request WHERE share_Id=?`, [id]);
    if(results.rows.length > 0){
      const item = results.rows.item(0);
      if(item.description === undefined){
        item.description = '';
      }
      const requestPageItem: request_page = {
        share_Id: item.share_Id,
        user_Id: item.user_Id,
        description: item.description
      };
      return requestPageItem;
    }else{
      throw new Error('No request page found');
    }
  }catch(error){
    console.error(error);
    throw Error('Failed to get request page items');
  }
};

export const getUserDetails = async(db:SQLiteDatabase, id:number): Promise<userD> =>{
  try{
    const [results] = await db.executeSql(`SELECT * FROM User WHERE user_id =?`,[id]);
    if(results.rows.length>0){
      const userP = results.rows.item(0);
      const userProfile: userD = {
        user_Id: userP.user_id,
        name: userP.name,
        birthday: userP.birthday,
        email: userP.email,
        phone_Number: userP.phone_Number,
        address: userP.address,
        followers: userP.followers,
        following: userP.following,
        redeemed_Coupons: userP.redeemed_Coupons,
        bio: userP.bio,
        pf: userP.pf,
        share_Posts: userP.share_Posts,
        explore_Posts: userP.explore_Posts
      };
      return userProfile;
    }else{
      throw new Error('No user found');
    }
  }catch(error){
    console.error(error);
    throw Error('Failed to get request page items');
  }
}

export const saveNewShareItem = async(db: SQLiteDatabase, shareItem:share_page) => {
  const insertQuery = `INSERT INTO Share (type,title,tags,address,picture) VALUES` + 
  `(${shareItem.type}, '${shareItem.title}', '${shareItem.tags}', '${shareItem.address}', '${shareItem.picture}')`;

  return db.executeSql(insertQuery);
};


//Profile page related stuff



//Deals page related stuff

// Fetch deals from the database
export const getDealsPage = async(db: SQLiteDatabase, keyword: string): Promise<deal_page[]> => {
  try {
    const deals: deal_page[] = [];
    let query = `SELECT * FROM Deals`;

    if (keyword) {
      query += ` WHERE title LIKE '%${keyword}%' OR description LIKE '%${keyword}%'`;
    }

    const results = await db.executeSql(query);
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        deals.push(result.rows.item(index));
      }
    });

    return deals;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get deals');
  }
};

// Insert a new deal
export const saveNewDeal = async(db: SQLiteDatabase, deal: deal_page) => {
  const insertQuery = `
    INSERT INTO Deals (title, description, picture, date_created) 
    VALUES ('${deal.title}', '${deal.description}', '${deal.picture}', '${deal.date_created}')
  `;

  return db.executeSql(insertQuery);
};

export const updateDeal = async(db: SQLiteDatabase, deal: deal_page) => {
  const updateQuery = `
    UPDATE Deals 
    SET title = '${deal.title}', 
        description = '${deal.description}', 
        picture = '${deal.picture}'
    WHERE deal_Id = ${deal.deal_Id}
  `;

  return db.executeSql(updateQuery);
};

export const deleteDeal = async(db: SQLiteDatabase, deal_Id: number) => {
  const deleteQuery = `DELETE FROM Deals WHERE deal_Id = ${deal_Id}`;

  return db.executeSql(deleteQuery);
};

export const getCommentsForDeal = async(db: SQLiteDatabase, dealId: number): Promise<comment[]> => {
  try {
    const comments: comment[] = [];
    const query = `SELECT * FROM Comments WHERE deal_Id = ?`;
    const results = await db.executeSql(query, [dealId]);
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        comments.push(result.rows.item(index));
      }
    });
    return comments;
  } catch (error) {
    console.error('Failed to get comments', error);
    throw Error('Failed to get comments');
  }
};



//Explore page related stuff
export const getExplorePage = async(db: SQLiteDatabase, keyword: string): Promise<explore_page[]> => {
  try {
    const explores: explore_page[] = [];
    let query = `SELECT * FROM Explores`;

    if (keyword) {
      query += ` WHERE title LIKE '%${keyword}%' OR description LIKE '%${keyword}%'`;
    }

    const results = await db.executeSql(query);
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        explores.push(result.rows.item(index));
      }
    });

    return explores;
  } catch (error) {
    console.error(error);
    throw Error('Failed to get explores');
  }
};

export const saveNewExplore = async(db: SQLiteDatabase, explore: explore_page) => {
  const insertQuery = `
    INSERT INTO Explores (title, description, picture, date_created) 
    VALUES ('${explore.title}', '${explore.description}', '${explore.picture}', '${explore.date_created}')
  `;

  return db.executeSql(insertQuery);
};

// In db-service.ts

export const getCommentsForExplore = async (
  db: SQLiteDatabase,
  exploreId: number
): Promise<comment[]> => {
  try {
    const comments: comment[] = [];
    const results = await db.executeSql(
      `SELECT * FROM Comments WHERE explore_Id = ?`,
      [exploreId]
    );
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        comments.push(result.rows.item(index));
      }
    });
    return comments;
  } catch (error) {
    console.error('Failed to get comments', error);
    throw Error('Failed to get comments');
  }
};

// Make sure to also add the saveNewComment function if it doesn't exist:
export const saveNewComment = async (
  db: SQLiteDatabase,
  comment: comment
) => {
  const insertQuery = `
    INSERT INTO Comments (explore_Id, user_Name, comment_Text)
    VALUES (?, ?, ?)
  `;
  await db.executeSql(insertQuery, [
    comment.explore_Id,
    comment.user_Name,
    comment.comment_Text,
  ]);
};


//login and register related stuff




//-----------------------------TESTING STUFF---IGNORE--------------------------------
//everytime you edit the db externally, you need to uninstall the app first then reinstall it for it to notice the changes.
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

