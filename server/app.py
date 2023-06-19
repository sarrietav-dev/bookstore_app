from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_restful import Api, Resource
from flask_cors import CORS
import os

app = Flask(__name__)
cors = CORS(app, resources={r"/books/*": {"origins": "*"}})
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DB_CONNECTION_STRING")
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)
api = Api(app)


# Modelo para el objeto LIBROS

@app.before_request
def create_tables():
    db.create_all()


class Books(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    category = db.Column(db.String(100))


class Book_schemathic(ma.Schema):
    class Meta:
        fields = ("id", "name", "category")


books_schemathic = Book_schemathic()
books_schemathic = Book_schemathic(many=True)


class ResourceSingleBook(Resource):
    def get(self, book_id):
        book = Books.query.get_or_404(book_id)
        return books_schemathic.dump([book])

    def put(self, book_id):
        book = Books.query.get_or_404(book_id)

        if 'name' in request.json:
            book.name = request.json['name']
        if 'category' in request.json:
            book.category = request.json['category']

        db.session.commit()
        return books_schemathic.dump([book])

    def delete(self, book_id):
        book = Books.query.get_or_404(book_id)
        db.session.delete(book)
        db.session.commit()
        return '', 204


class ResourceListBooks(Resource):
    def get(self):
        books = Books.query.all()
        return books_schemathic.dump(books)

    def post(self):
        new_book = Books(
            name=request.json['name'], category=request.json['category'])
        db.session.add(new_book)
        db.session.commit()
        return books_schemathic.dump([new_book])


api.add_resource(ResourceListBooks, '/books')
api.add_resource(ResourceSingleBook, '/books/<int:book_id>')



if __name__ == '__main__':
    app.run(port=5000)
