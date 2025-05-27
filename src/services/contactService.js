const db = require("../config/db");

function query(sql, values) {
  return new Promise((resolve, reject) => {
    db.query(sql, values, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
}

async function handleIdentify(email, phoneNumber) {
  const linkedContacts = await query(
    `SELECT * FROM contacts WHERE email = ? OR phoneNumber = ?`,
    [email, phoneNumber]
  );

  let primary = linkedContacts.find((c) => c.linkPrecedence === "primary");

  if (!primary) {
    const result = await query(
      `INSERT INTO contacts (email, phoneNumber, linkPrecedence) VALUES (?, ?, 'primary')`,
      [email, phoneNumber]
    );
    primary = {
      id: result.insertId,
      email,
      phoneNumber,
      linkPrecedence: "primary",
    };
  } else {
    const match = linkedContacts.find(
      (c) => c.email === email && c.phoneNumber === phoneNumber
    );
    if (!match) {
      await query(
        `INSERT INTO contacts (email, phoneNumber, linkedId, linkPrecedence) VALUES (?, ?, ?, 'secondary')`,
        [email, phoneNumber, primary.id]
      );
    }
  }

  const finalContacts = await query(
    `SELECT * FROM contacts WHERE id = ? OR linkedId = ?`,
    [primary.id, primary.id]
  );

  const emails = [
    ...new Set(finalContacts.map((c) => c.email).filter(Boolean)),
  ];
  const phoneNumbers = [
    ...new Set(finalContacts.map((c) => c.phoneNumber).filter(Boolean)),
  ];
  const secondaryContactIds = finalContacts
    .filter((c) => c.linkPrecedence === "secondary")
    .map((c) => c.id);

  return {
    primaryContactId: primary.id,
    emails,
    phoneNumbers,
    secondaryContactIds,
  };
}

module.exports = { handleIdentify };
