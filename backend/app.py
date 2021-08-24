import uuid
import os
import json
from flask import Flask, request, jsonify
from models import get_session, User, Profile, FeedData, create_all


app = Flask(__name__)
feed_data = None


@app.route("/user/create", methods=["POST"])
def create_user_endpoint():
    r = request.json
    username = r.get("username")
    first_name = r.get("first_name")
    last_name = r.get("last_name")
    session = get_session()
    user = User()
    profile = Profile()
    user.user_uuid = str(uuid.uuid4())
    user.username = username
    profile.user_uuid = user.user_uuid
    profile.first_name = first_name
    profile.last_name = last_name
    user.profile = profile
    u = session.merge(user)
    session.commit()
    session.close()
    return jsonify({"return": "success"}), 200


@app.route("/feed", methods=["GET"])
def fetch_feed_data():
    global feed_data

    session = get_session()

    rows = session.execute("select * from feed_data;").fetchall()

    data = [list(row) for row in rows]

    print(json.dumps({"return": "success", "data": data}))
    return json.dumps({"return": "success", "data": data}), 200


def seed_database():
    global feed_data
    # read data from feed.json and convert to data object
    cwd = os.getcwd()
    pathToDataFeed = os.path.join(cwd, "data/feed.json")
    with open(pathToDataFeed) as f:
        data = json.load(f)

    # store data in app.db
    feed_data = FeedData()
    count = 0
    for row in data:
        session = get_session()
        feed_data.row_id = str(count)
        feed_data.caption = row["caption"]
        feed_data.followers = row["followers"]
        feed_data.image_url = row["image_url"]
        feed_data.likes = row["likes"]
        feed_data.profile_image_url = row["profile_image_url"]
        feed_data.title = row["title"]
        feed_data.username = row["username"]
        u = session.merge(feed_data)
        session.commit()
        count += 1
    session.close()


if __name__ == "__main__":
    if not os.path.exists("app.db"):
        create_all()
    seed_database()
    fetch_feed_data()
    # app.run(host="0.0.0.0", port=5000, debug=True)
