import uuid
import os
from flask import Flask, request, jsonify
from models import get_session, User, Profile, create_all


app = Flask(__name__)


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


@app.route("", methods=["GET"])
def get_feed():
    # pull data from data base and encapsulate in json object
    # send data to front-end
    pass


def seed_database():
    # read data from feed.json
    # store in app.db
    pass


if __name__ == "__main__":
    if not os.path.exists("app.db"):
        create_all()
    seed_database()
    app.run(host="0.0.0.0", port=5000, debug=True)
