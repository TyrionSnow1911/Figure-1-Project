from sqlalchemy import Column, Text, ForeignKey
from sqlalchemy.orm import relationship
from .base import Base


class User(Base):
    __tablename__ = 'u_user'
    username = Column(Text)
    user_uuid = Column(Text, primary_key=True)
    profile = relationship('Profile', backref='user', uselist=False)


class Profile(Base):
    __tablename__ = 'u_profile'
    first_name = Column(Text)
    last_name = Column(Text)
    user_uuid = Column(Text, ForeignKey(User.user_uuid), primary_key=True)
