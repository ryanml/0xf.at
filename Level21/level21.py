# Author: ryanml
# Purpose: Solves Level 21 of 0xf.at

class Level21Solver(object):

    def __init__(self, dict_file):
        """
        Reads the file, strips \n characters adds it to the dictionary list
        """
        self.dict_words = []
        dict_file = open(dict_file, "r+")
        for word in dict_file:
            self.dict_words.append(word.strip('\n'))

    def get_correct_word(self, scrambled_word):
        """
        Loops through dictionary list, returns the unscrambled word once the match is found
        """
        for word in self.dict_words:
            # Checks to make sure the words are the same length, no point in continuing if not
            if len(word) == len(scrambled_word):
                # Copy of scrambled word is made
                scr = scrambled_word
                # As matching characters are found, they are removed from the copy
                for ch in word:
                    if ch in scr:
                        scr = scr.replace(ch, '', 1)
                # If every character matches, we will be left with an empty string
                if scr == '':
                    return word

    def unscramble_text(self, scrambled_text):
        """
        returns the solution in format string;string;string
        """
        solution = []
        scrambled_words = scrambled_text.split(';')
        # Gets unscrambled word for each word
        for scrambled_word in scrambled_words:
            correct_word = self.get_correct_word(scrambled_word)
            # Adds it to solution list
            solution.append(correct_word)
        # Join solution list with semicolon
        return ';'.join(solution)

def main():
    # Create Solver object with path to dictionary file
    solver = Level21Solver("dictionary.txt")
    # Gets scrambled string from user
    scrambled_text = raw_input("Enter the text to unscramble:\n")
    # Solves and prints solution
    solution = solver.unscramble_text(scrambled_text)
    print solution

if __name__ == "__main__":
    main()
