console.log("OB");

const body = { name: "naraa", age: 23 };

const keys = Object.keys(body);
const values = Object.values({ name: "naraa" });
const ob = Object.entries(body);

console.log(keys);
console.log(values);

const a = keys.map((key) => `${key}=${body[key]}`);
const b = ob.join(" ");
const c = b.split(/(\d)/);

console.log("a", a);
console.log("ob", ob);
console.log("b", b);
console.log("c", c);

// UPDATE tableName SET b WHERE key1 = value1 AND key2 = value2 AND key3 = value3;
