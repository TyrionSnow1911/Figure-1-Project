from sqlalchemy import Column, Text, ForeignKey
from sqlalchemy.orm import relationship
from .base import Base


class User(Base):
    __tablename__ = "u_user"
    username = Column(Text)
    user_uuid = Column(Text, primary_key=True)
    profile = relationship("Profile", backref="user", uselist=False)


class Profile(Base):
    __tablename__ = "u_profile"
    first_name = Column(Text)
    last_name = Column(Text)
    user_uuid = Column(Text, ForeignKey(User.user_uuid), primary_key=True)


class FeedData(Base):
    __tablename__ = "feed_data"
    row_id = Column(Text, primary_key=True)
    caption = Column(Text)
    followers = Column(Text)
    image_url = Column(Text)
    likes = Column(Text)
    profile_image_url = Column(Text)
    title = Column(Text)
    username = Column(Text)

    # "caption": "Duis bibendum. Morbi non quam nec dui luctus rutrum. Nulla tellus.\n\nIn sagittis dui vel nisl. Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus.",
    # "followers": 46,
    # "image_url": "http://dummyimage.com/1243x113.png/ff4444/ffffff",
    # "likes": 411,
    # "profile_image_url": "http://dummyimage.com/100x100.png/ff4444/ffffff",
    # "title": "Quam nec dui",
    # "username": "jcranstone0"

