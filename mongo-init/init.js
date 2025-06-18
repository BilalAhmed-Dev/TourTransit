// Check if database is already initialized
const initialized = db.system.users.countDocuments({
    user: {$ne: "root"},
    db: "mydb"
}) > 0;

if (!initialized) {
    // Create application user with proper privileges
    db.getSiblingDB("admin").auth("root", "1234");
    db.getSiblingDB("mydb").createUser({
        user: "appuser",
        pwd: "myapppassword",
        roles: ["readWrite", "dbAdmin"]
    });
    
    // Load data
    const tours = JSON.parse(cat("/docker-entrypoint-initdb.d/data/tours.json"));
    const users = JSON.parse(cat("/docker-entrypoint-initdb.d/data/users.json"));
    const reviews = JSON.parse(cat("/docker-entrypoint-initdb.d/data/reviews.json"));
    
    db.tours.insertMany(tours);
    db.users.insertMany(users);
    db.reviews.insertMany(reviews);
    
    print("✅ Data successfully loaded");
} else {
    print("⏩ Database already initialized, skipping import");
}
