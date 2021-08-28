import uuid
import os
import json
from flask_cors import CORS
from flask import Flask, request, jsonify
from models import get_session, User, Profile, CaseData, create_all


app = Flask(__name__)
CORS(app)
case_data = CaseData()
user = User()
profile = Profile()


@app.route("/user/create", methods=["POST"])
def create_user_endpoint():
    global user
    global profile
    data = request.json
    username = data.get("username")
    first_name = data.get("first_name")
    last_name = data.get("last_name")
    session = get_session()
    user.user_uuid = str(uuid.uuid4())
    user.username = username
    profile.user_uuid = user.user_uuid
    profile.first_name = first_name
    profile.last_name = last_name
    user.profile = profile
    u = session.merge(user)
    session.commit()
    session.close()
    return jsonify({"success": True}), 200


def seed_database():
    global case_data
    cwd = os.getcwd()
    pathToDataFeed = os.path.join(cwd, "data/feed.json")
    with open(pathToDataFeed) as f:
        data = json.load(f)
    count = 0
    for row in data:
        session = get_session()
        case_data.case_id = str(count)
        case_data.caption = row["caption"]
        case_data.followers = row["followers"]
        case_data.image_url = row["image_url"]
        case_data.likes = row["likes"]
        case_data.profile_image_url = row["profile_image_url"]
        case_data.title = row["title"]
        case_data.username = row["username"]
        u = session.merge(case_data)
        session.commit()
        count += 1
    session.close()


@app.route("/case_data", methods=["GET"])
def fetch_case_data():
    global case_data
    session = get_session()
    rows = session.execute("select * from case_data;").fetchall()

    result = []
    for row in rows:
        data = {}
        data["case_id"] = row[0]
        data["caption"] = row[1]
        data["followers"] = row[2]
        data["image_url"] = row[3]
        data["likes"] = row[4]
        data["profile_image_url"] = row[5]
        data["title"] = row[6]
        data["username"] = row[7]
        result.append(data)

    return json.dumps({"success": True, "data": result}), 200


@app.route("/case_details", methods=["GET"])
def fetch_case_details():
    global case_data
    case_id = request.args.get("case_id")

    session = get_session()
    result = session.execute(
        "select * from case_data where case_id=%s;" % str(case_id)
    ).fetchall()[0]

    data = {}
    data["case_id"] = result[0]
    data["caption"] = result[1]
    data["followers"] = result[2]
    data["image_url"] = result[3]
    data["likes"] = result[4]
    data["profile_image_url"] = result[5]
    data["title"] = result[6]
    data["username"] = result[7]

    return json.dumps({"success": True, "data": data}), 200


if __name__ == "__main__":
    if not os.path.exists("app.db"):
        create_all()
    seed_database()
    app.run(host="localhost", port=5000, debug=True)
