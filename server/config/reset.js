import { pool } from './database.js';  
import '../config/dotenv.js';            
import bugData from '../data/bugs.js'; 

const createBugsTable = async () => {

const createTableQuery =`

DROP TABLE IF EXISTS bugs;

CREATE TABLE IF NOT EXISTS bugs (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    disposition VARCHAR(10) NOT NULL,
    region VARCHAR(255) NOT NULL,
    image VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    submittedBy VARCHAR(255) NOT NULL,
    submittedOn TIMESTAMP NOT NULL
)`

try {
    const res = await pool.query(createTableQuery)
    console.log('🎉 bugs table created successfully')

} catch(err) {
    console.error('⚠️ error creating bugs table', err)
}

}

const seedBugsTable = async () => {
    await createBugsTable() 

    bugData.forEach((bug) => {

        const insertQuery = {
            text: 'INSERT INTO bugs (name, disposition, region, image, description, submittedBy, submittedOn) VALUES ($1, $2, $3, $4, $5, $6, $7)'
          }

        const values = [
        bug.name,
        bug.disposition,
        bug.region,
        bug.image,
        bug.description,
        bug.submittedBy,
        bug.submittedOn
        ]

        pool.query(insertQuery, values, (err, res) => {
            if (err) {
                console.error('⚠️ error inserting bug', err)
                return
            }
        
            console.log(`✅ ${bug.name} added successfully`)
        })

    })
  
  }

seedBugsTable()
