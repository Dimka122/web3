struct User {
    address login;
    string password;
    string username;
    string avatar;
}

struct Mess {
    User author;
    string text;
    uint likes;
    uint createdTime;
}