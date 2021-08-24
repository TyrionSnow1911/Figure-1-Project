from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

engine = create_engine('sqlite:///app.db', echo=True)


Base = declarative_base()


def create_all():
    Base.metadata.create_all(engine)


def drop_all():
    Base.metadata.drop_all(engine)


def get_session():
    Session = sessionmaker(bind=engine)
    session = Session()
    return session
