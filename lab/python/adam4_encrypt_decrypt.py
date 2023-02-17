# Binary to string decode, string to binary encode
from cryptography.fernet import Fernet
key = Fernet.generate_key().decode()
print(key)
cipher_suite = Fernet(key)
encoded_text = cipher_suite.encrypt("Hello stackoverflow!".encode())
print(encoded_text.decode())
decoded_text = cipher_suite.decrypt(encoded_text)
print(decoded_text.decode())
