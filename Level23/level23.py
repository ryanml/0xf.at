# Author: ryanml
# Purpose: Solves level 23 of 0xf.at
# Note: There is known issue with this problem, the password it sends back does not always work for some reason,
#  so multiple attempts may be necessary.
import socket
import sys

class Level23Solver(object):

    #Constant server and port values
    SERVER = '212.17.118.125'
    PORT = 2323

    def __init__(self, auth_token):
        """
        Takes an auth_token upon construction, connects to server and sends token
        """
        self.auth_token = auth_token
        self.tcp_sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        # Connect to server
        self.tcp_sock.connect((self.SERVER, self.PORT))
        self.tcp_sock.send(self.auth_token)
        print "\nWaiting for password...\n"
        # While connected, handle message
        while 1:
            msg = self.tcp_sock.recv(1028)
            self.handle(msg)

    def handle(self, msg):
        """
        Prints the password when it is received
        """
        if "Password" in msg:
            print msg
            sys.exit()

def main():
    auth_token = raw_input("Enter the auth token to send:\n")
    solver = Level23Solver(auth_token)

if __name__ == "__main__":
    main()
