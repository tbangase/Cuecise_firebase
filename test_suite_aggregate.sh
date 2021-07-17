curl -X PUT -d '{
    createdAt: firebase.firestore.Timestamp.now(),
    exp : 0,
    firstName : "Test_First_Name",
    lastName : "Test_Last_Name",
    isDark : true,
    lastSignIn : firebase.firestore.Timestamp.now(),
    level : 0,
    revengeTimes : 0,
    streak : 0
}' 'http://localhost:8080/emulator/v1/projects/firestore-emulator-example/databases/users.json'

# 'http://localhost:4000/firestore/users.json'
# ""