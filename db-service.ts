import { enablePromise, openDatabase, SQLiteDatabase } from 'react-native-sqlite-storage';
import { ToDoItem, explore_page, share_page, request_page, userD, deal_page, comment } from './src/models';
import RNFS from 'react-native-fs';

enablePromise(true);

//------------------------------ECOEATSSTUFF----------------------------------

const dbName = 'ecoeats.db';
const internalDbPath = `${RNFS.DocumentDirectoryPath}/${dbName}`;

// Function to copy the database from assets to internal storage
export const copyDatabase = async () => {
  try {
    const dbExists = await RNFS.exists(internalDbPath);
    console.log('Internal DB Path:', internalDbPath); // Log the internal DB path
    console.log('Exists:', dbExists);
    if (dbExists) {
      await RNFS.unlink(internalDbPath); // Delete the existing database
      console.log('Old database deleted from internal storage');
    }

    await RNFS.copyFileAssets(`www/${dbName}`, internalDbPath);
    console.log('Database copied to internal storage');
    console.log(internalDbPath);
  } catch (error) {
    console.error('Error copying database: ', error);
    throw error;
  }
};

// Function to get the database connection
export const getEcoEatsDBConnection = async (): Promise<SQLiteDatabase> => {
  const dbPath = `${RNFS.DocumentDirectoryPath}/${dbName}`;
  console.log('Connecting to database at:', dbPath);
  return openDatabase({
    name: dbName,
    // createFromLocation: '~www/ecoeats.db',
    location: 'default', // Ensure it uses the correct location
  });
};

const listTables = async (db: SQLiteDatabase) => {
  try {
    const query = 'SELECT name FROM sqlite_master WHERE type="table"';
    const results = await db.executeSql(query);

    if (results.length > 0) {
      const tables = [];
      for (let i = 0; i < results[0].rows.length; i++) {
        tables.push(results[0].rows.item(i).name);
      }
      console.log('Tables in the database:', tables);
      return tables;
    } else {
      console.log('No tables found in the database');
      return [];
    }
  } catch (error) {
    console.error('Error fetching tables:', error);
    throw error;
  }
};

const checkTables = async () => {
  const db = await getEcoEatsDBConnection(); // Open the database
  const tables = await listTables(db);       // List the tables

  if (tables.length === 0) {
    console.log('No tables found in the database.');
  } else {
    console.log('Tables in the database:', tables);
  }
};

// Share and Explore related functions
export const getSharePage = async (
  db: SQLiteDatabase,
  type: number | undefined,
  keyword: string,
  id: string | undefined
): Promise<share_page[]> => {
  try {
    const sharePageItems: share_page[] = [];
    let query;
    if (keyword === '') {
      query = `SELECT * FROM Share WHERE type=${type}`;
    } else {
      query = `SELECT * FROM Share WHERE type=${type} AND title LIKE '%${keyword}%'`;
    }
    console.log(id);
    console.log(type);
    console.log(keyword);
    if (id && type === undefined && keyword==="") {
      query = `SELECT * FROM Share WHERE share_id IN (${id})`;
    } else if(id===null && type === undefined && keyword===""){
      return [];
    }

    const results = await db.executeSql(query);
    results.forEach(result => {
      for (let index = 0; index < result.rows.length; index++) {
        sharePageItems.push(result.rows.item(index));
      }
    });
    return sharePageItems;
  } catch (error) {
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

export const saveNewRequestItem = async (db: SQLiteDatabase, user_Id:number,description:string) => {
  try {
    const insertRequestQuery = `INSERT INTO Request (user_Id, description) VALUES (${user_Id}, "${description}")`;
    console.log(insertRequestQuery);
    return db.executeSql(insertRequestQuery);
  } catch (error) {
    console.error('Error saving request item:', error);
    throw error;
  }
};

export const getLastestRequestItem =  async(db:SQLiteDatabase) =>{
  try{
    const getShareIdQuery = `SELECT share_Id FROM Request ORDER BY share_Id DESC LIMIT 1`;
    return Number(db.executeSql(getShareIdQuery));
  }catch(error){
    console.log('Failed to get latest request item');
  }
}

export const saveNewShareItem = async (db: SQLiteDatabase, type:number, title:string,tags:string|null,address:string,picture:string,expiration:string, id: number) => {
  try {
    const insertShareQuery = `INSERT INTO Share (share_Id, type, title, tags, address, picture, expiration) VALUES (?, ?, ?, ?, ?, ?, ?)`;
    return db.executeSql(insertShareQuery, [id,type, title, tags, address, picture,expiration]);
  } catch (error) {
    console.error('Error saving share item:', error);
    throw error;
  }
};

export const updateUserSharePosts = async (db: SQLiteDatabase, share_Id:number, user_Id:number) => {
  try{
    console.log("testing backend of adding share"+user_Id);
    let query = `SELECT * FROM User WHERE user_Id = ${user_Id}`;
    let [output] = await db.executeSql(query);
    let newSharePosts;
    if(output.rows.item(0).share_Posts){
      newSharePosts = output.rows.item(0).share_Posts.concat(",",share_Id);
    }else{
      newSharePosts = share_Id.toString();
    }
    query = `UPDATE User SET share_Posts = '${newSharePosts}' WHERE user_Id = ${user_Id}`;
    return db.executeSql(query);
  }catch(error){
    console.log('Failed to update user share posts');
  }
};

//Profile page related stuff
export const checkLoginDetails = async(db: SQLiteDatabase, username:string, password:string) =>{
  try{
    console.log("1"+username + password+"2");
    const profileQuery = `SELECT * FROM User_credential WHERE username= "${username}" AND password= "${password}"`;
    const [results] = await db.executeSql(profileQuery);
    // console.log("outoput of login");
    // console.log(results);
    // console.log(results.rows.item(0).user_Id);
    return results.rows.item(0).user_Id;
  }catch(error){
    console.error(error);
    throw Error('Failed to get user credentials');
  }
};

export const registeringUser = async(db: SQLiteDatabase, username:string, password:string, accountType:number, email:string) =>{
  try{
    const insertAccCredentialQuery = `INSERT INTO User_credential (password,username,account_Type) VALUES (?, ?, ?)`;
    await db.executeSql(insertAccCredentialQuery, [password, username,accountType]);
    const insertAccProfileQuery = 'INSERT INTO User (name,birthday,email,phone_Number,address,followers,following,reedemed_Coupons,bio,pf,share_Posts,explore_Posts) VALUE (?,?,?,?,?,?,?,?,?,?,?,?,)';
    await db.executeSql(insertAccProfileQuery, ['NewUser', null, email, null, null, null, null, null, null, null, null, null]);

    const registeredUserIdQuery = `SELECT * FROM User WHERE email = "${email}"`;
    const [results] = await db.executeSql(registeredUserIdQuery);
    console.log("outoput of registering");
    console.log(results);
    console.log(results.rows.item(0).user_Id);
    return results.rows.item(0).user_Id;
  }catch(error){
    console.error(error);
    throw Error('Failed to add user');
  }
};

export const updateProfilePicture = async(db:SQLiteDatabase, user_Id:number,picture:any) =>{
  try{
    const query = `UPDATE User SET pf = "${picture}" WHERE user_Id = ${user_Id}`;
    console.log(query);
    return db.executeSql(query);
  }catch(error){
    console.log('Failed to update user profile picture');
  }
};


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
// export const getDBConnection = async () => {
//   return SQLite.openDatabase({
//     name: 'todo-data.db', createFromLocation: '~www/todo-data.db', },() => { },);
// };

// export const createTable = async (db: SQLiteDatabase) => {
//   // create table if not exists
//   const query = `CREATE TABLE IF NOT EXISTS ${tableName}(
//         value TEXT NOT NULL
//     );`;

//   await db.executeSql(query);
// };

// export const getTodoItems = async (db: SQLiteDatabase): Promise<ToDoItem[]> => {
//   try {
//     const todoItems: ToDoItem[] = [];
//     const results = await db.executeSql(`SELECT rowid as id,value FROM ${tableName}`);
//     results.forEach(result => {
//       for (let index = 0; index < result.rows.length; index++) {
//         // result.rows.item(index)["picture"] =  require('./src/images/share1.png');
//         todoItems.push(result.rows.item(index))
//       }
//     });
//     return todoItems;
//   } catch (error) {
//     console.error(error);
//     throw Error('Failed to get todoItems !!!');
//   }
// };

// export const saveTodoItems = async (db: SQLiteDatabase, todoItems: ToDoItem[]) => {
//   const insertQuery =
//     `INSERT OR REPLACE INTO ${tableName}(rowid, value) values` +
//     todoItems.map(i => `(${i.id}, '${i.value}')`).join(',');

//   return db.executeSql(insertQuery);
// };

// export const deleteTodoItem = async (db: SQLiteDatabase, id: number) => {
//   const deleteQuery = `DELETE from ${tableName} where rowid = ${id}`;
//   await db.executeSql(deleteQuery);
// };

// export const deleteTable = async (db: SQLiteDatabase) => {
//   const query = `drop table ${tableName}`;

//   await db.executeSql(query);
// };

