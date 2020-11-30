const db = require("../dabatase/client");

module.exports.create = async (req, res, next) => {
  const query = `
    CREATE TABLE city (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        UNIQUE (name)
        post_code int [not null]
        state VARCHAR [not null]
        country_code varchar [not null, pk]
        country_flag boolean
        country_name varchar [not null]
       }
      
    );
    CREATE TABLE category (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        UNIQUE (name)
    );
    CREATE TABLE transporter (
        id SERIAL NOT NULL,
        name VARCHAR(255) NOT NULL,
        picture VARCHAR(255),
        city_id int NOT NULL,
        category varchar (20) [NOT NULL]
        avatar varchar(200)
        company_type varchar(64) [NOT NULL]
        email varchar(255) [NOT NULL]
        first_name varchar(60) [not null]
        last_name varchar(60) [not null]
        tel_num varchar(100) [not null]
        fax varchar(100) [not null] 
        website varchar(255) 
        owner_date_of_birth date [not null]
        company_reg_date timestampz [not null, default: `now()`] 
        company_vat_id varchar(100) 
        company_logo varchar(255) 
        registered_company_id varchar
        company_transport_license boolean [not null]
        company_transport_insurance boolean [not null]
        company_profile_description text [NOT NULL]
        company_operating_region text [NOT NULL]
        company_account_balance int
        company_address varchar
        company_post_code int
        city varchar
        company_invoice_id int
        country varchar     
        PRIMARY KEY (id),
        CONSTRAINT fk_city_id FOREIGN KEY (city_id) REFERENCES city (id) ON DELETE CASCADE
    );
    CREATE TABLE review (
        id SERIAL PRIMARY KEY,
        transporter_id int NOT NULL,
        review TEXT NOT NULL,
        published_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT fk_transporter_id FOREIGN KEY (transporter_id) REFERENCES transporter (id) ON DELETE CASCADE
    );
    CREATE TABLE transporter_has_category (
        transporter_id INT NOT NULL,
        category_id INT NOT NULL,
        PRIMARY KEY(transporter_id, category_id),
        FOREIGN KEY(transporter_id) REFERENCES transporter(id) ON DELETE CASCADE,
        FOREIGN KEY(category_id) REFERENCES category(id) ON DELETE CASCADE
    );
    `;
  try {
    await db.query(query);
    res.send("Database successfully created");
  } catch (e) {
    console.log(e.message);
  }
};

module.exports.seed = async (req, res, next) => {
  try {
    // Remove all previous values before seeding (prevent UNIQUE constraint errors)
    const deleteQuery = `
    DELETE FROM city RETURNING *;
    DELETE FROM review RETURNING *;
`;

    const [{ rows: cityDeleteRows }, { rows: categoryDeleteRows }] = await db
      .query(deleteQuery)
      .catch((e) => console.log({ deleteQuery: e.message }));

    // Seed tables sequentially (not in parallel, some depend upon the others (for foreign keys))

    const cityQuery = `
    INSERT INTO city (name) VALUES
    ('Paris'), ('New-York'), ('Tokyo'), ('London'), ('Lisbon'), ('Lagos'), ('Seoul'), ('Busan'), ('Ho Chi Minh City')
    RETURNING *;
`;

    const { rows: cityRows } = await db
      .query(cityQuery)
      .catch((e) => console.log({ citySeedError: e.message }));
    // Will return something like this:
    // [
    //     {
    //         "id": 1,
    //         "name": "Paris"
    //     },
    //     {
    //         "id": 2,
    //         "name": "New-York"
    //     }
    // ]

    const categoryQuery = `
    INSERT INTO category (name) VALUES
    ('Removals'), ('Vehicles & Boat Transport'), ('Cargo'), ('Containers TLD'), ('Heavy Transport'), ('Special Transport'), ('Oversea Forwarding'),
    RETURNING *;
`;

    const { rows: categoryRows } = await db
      .query(categoryQuery)
      .catch((e) => console.log({ categorySeedError: e.message }));
    // Will return something like this:
    //    [
    //     {
    //         "id": 55,
    //         "name": "Hipster"
    //     },
    //     {
    //         "id": 56,
    //         "name": "Brunch"
    //     }
    //    ]

    const genRandomCityId = () => {
      const possibleIds = cityRows.map((city) => city.id);
      return possibleIds[Math.floor(Math.random() * possibleIds.length)];
    };

    const transporterQuery = `
    INSERT INTO transporter (name, picture, city_id) VALUES
    ('JoJo Pizza', 'https://via.placeholder.com/250', '${genRandomCityId()}'),
    ('The Falafel Queen', 'https://via.placeholder.com/250', '${genRandomCityId()}'),
    ('Sushi Me Tenderly', 'https://via.placeholder.com/250', '${genRandomCityId()}'),
    ('My Big Fat Greasy Kebab', 'https://via.placeholder.com/250', '${genRandomCityId()}'),
    ('The Excellium', 'https://via.placeholder.com/250', '${genRandomCityId()}'),
    ('Benito Pepito Pizza', 'https://via.placeholder.com/250', '${genRandomCityId()}'),
    ('Kim Duk Hwang - Taste of Korea', 'https://via.placeholder.com/250', '${genRandomCityId()}'),
    ('Banh Mi To The Moon', 'https://via.placeholder.com/250', '${genRandomCityId()}'),
    ('Ganges Upon Thames', 'https://via.placeholder.com/250', '${genRandomCityId()}')
    RETURNING *;
    `;

    const { rows: transporterRows } = await db
      .query(transporterQuery)
      .catch((e) => console.log({ transporterSeedError: e.message }));
    // Will return something like this:
    //   [
    //     {
    //         "id": 1,
    //         "name": "JoJo",
    //         "picture": "https://via.placeholder.com/250",
    //         "city_id": 5,
    //         "comment_id": null
    //     },
    //     {
    //         "id": 2,
    //         "name": "Falafel King",
    //         "picture": "https://via.placeholder.com/250",
    //         "city_id": 3,
    //         "comment_id": null
    //     }
    // ]

    const fakeReviews = [
      "Lovely",
      "Very good!",
      "5 Stars *****",
      "The waiter is an a$$hole! And so is the manager!",
      "I would rather eat my own food!",
      "Me and my friends had a lovely time!",
      "How can this gem not be known more? Great food/service/ambiance",
      "Could avoid",
      "Oh, fantastic!",
    ];

    const transporterIds = transporterRows.map((transporter) => transporter.id);

    const reviewsQuery = (review) => `
    INSERT INTO review (transporter_id, review) VALUES ('${
      transporterIds[Math.floor(Math.random() * transporterIds.length)]
    }', '${review}') RETURNING *;
    `;

    const reviewsPromises = fakeReviews.map(async (review) => {
      try {
        const { rows: reviewsRow } = await db.query(reviewsQuery(review));
        return { ...reviewsRow["0"] };
      } catch (e) {
        console.log({ reviewsSeedError: e.message });
      }
    });

    const reviewsRows = await Promise.all(reviewsPromises);
    // Will return something like this:
    // [
    //     {
    //         "id": 1,
    //         "restaurant_id": 5,
    //         "comment": "Lovely",
    //         "published_date": "2020-11-20T01:23:12.966Z"
    //     },
    //     {
    //         "id": 2,
    //         "restaurant_id": 1,
    //         "comment": "5 Stars *****",
    //         "published_date": "2020-11-20T01:23:12.972Z"
    //     }
    // ]

    const transporterCategoryQuery = (transporterId, categoryId) => `
    INSERT INTO transporter_has_category (transporter_id, category_id) VALUES
    ('${transporterId}', '${categoryId}')
    RETURNING *;
`;

    const categoryIds = categoryRows.map((category) => category.id);

    const transporterCategoryPromises = transporterIds.map(async (transporterId) => {
      try {
        const { rows: transporterCategoryRow } = await db.query(
          transporterCategoryQuery(
            transporterId,
            categoryIds[Math.floor(Math.random() * categoryIds.length)]
          )
        );
        return { ...transporterCategoryRow["0"] };
      } catch (e) {
        console.log({ transporterCategoryError: e.message });
      }
    });

    const transporterCategoryRows = await Promise.all(transporterCategoryPromises);
  

    // At the end: Return a formatted object containing all deleted/created values to the client
    res.send({
      created: [
        { cities: cityRows },
        { category: categoryRows },
        { transporters: transporterRows },
        { reviews: reviewRows },
        { transporter_category: transporterCategoryRows },
      ],
      deleted: [{ cities: cityDeleteRows }, { category: categoryDeleteRows }],
    });
  } catch (e) {
    console.log({ seedDatabaseError: e.message });
  }
};

module.exports.destroy = async (req, res, next) => {
  const nukeQuery = `
        DROP TABLE IF EXISTS transporter_has_category;
        DROP TABLE IF EXISTS review;
        DROP TABLE IF EXISTS category;
        DROP TABLE IF EXISTS transporter;
        DROP TABLE IF EXISTS city;
    `;
  try {
    await db.query(nukeQuery);
    res.send("Database successfully wiped clean");
  } catch (e) {
    console.log({ destroyDatabaseError: e.message });
  }
};
