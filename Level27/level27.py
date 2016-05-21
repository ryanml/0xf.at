# Author: ryanml
# Purpose: Solves Level 27 of 0xf.at
import socket
import sys

class Level27Solver(object):

    # Constant server and port values for this problem
    SERVER = '212.17.118.125'
    PORT = 2727

    def __init__(self, log_file):
        """
        Constructor takes a path to a log file. Opens the file, sets up socket object. Calls connect method
        """
        self.log_file = open(log_file, 'a+')
        self.tcp_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.s_connect()

    def s_connect(self):
        """
        Connects to server and sends GO message
        """
        self.tcp_socket.connect((self.SERVER, self.PORT))
        self.tcp_socket.send('GO')
        while 1:
            msg = self.tcp_socket.recv(512)
            self.eval_msg(msg)

    def eval_msg(self, msg):
        """
        Handles incoming expressions and solves them. Writes password to log file and exits program
        """
        if '=?' in msg:
            # All problems given are multiplications of two integers
            exp = msg.split('=')[0].split('*')
            solution = str(int(exp[0]) * int(exp[1]))
            self.tcp_socket.send(solution)
        if 'password' in msg:
            self.log_file.write(msg)
            self.log_file.close()
            sys.exit('Password written to log file.');

if __name__ == "__main__":
    solver = Level27Solver('log.txt')
