import abc

class RegisterAbc(abc.ABC):
    def __init__(self, model, **keyword_args):
        self.model = model
        for key, value in keyword_args.items():
            setattr(self, key, value)
    
    @abc.abstractmethod
    def register(self):
        pass
