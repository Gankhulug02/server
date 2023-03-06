console.log("OB");

const body = {
  users: [
    {
      id: "c259e94a-7a31-4d49-8714-0264a0531708",
      name: "Gankhulug",
      role: "user",
      email: "Huluguu0202@gmail.com",
      password: "$2b$10$aSt2h9quZEJEQLBvUJWkh.yi0hWjn4B97GIDL.hpxT5GDSXx.GYCe",
    },
    {
      id: "98132f40-c3d0-4d82-87c0-659a2651d0cd",
      name: "Уртнасан",
      role: "user",
      email: "@gmail.com",
      password: "$2b$10$Hj0VvN6UWy75zDcmUq30dOrTj.Y/fd0l092JwBmkydYFlLVZx0GVq",
    },
    {
      id: "daec7716-61f6-402c-bbdb-5342f7267fb8",
      name: "ganaa",
      role: "user",
      email: "Ganaa@gmail.com",
      password: "$2b$10$XNvvUjVs.KPeLV.G1hPOB.5O0ph1axi9FzN82AaI0NmOLK15TyuTe",
    },
    {
      id: "0f526f5c-7bec-4153-b7ed-828a4403e49b",
      name: "namsrai",
      role: "user",
      email: "namsrai.yo@gmail.com",
      password: "$2b$10$dkkfkZ0L3HD8RpP/Ln6v8OH9WP1DJOpp2VfDgu4n71XtYyWsmoTna",
    },
  ],
};

// const keys = Object.keys(body);
let values = "('test', 'test', 'test', 'test', 'test')";
const convert = body.users.map((e) => {
  const keys = Object.keys(e);
  const map = keys.map((key) => `'${e[key]}`);
  const join = map.join();
  values += `,(${join})`;
});
console.log(values);

// console.log(keys);
// console.log(map);
// console.log(join);

// UPDATE tableName SET b WHERE key1 = value1 AND key2 = value2 AND key3 = value3;
