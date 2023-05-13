describe('Test the retry method', () => {
    let counter = 0;

    it('should pass only for the seconds try', () => {
        expect(counter++).to.eql(1);
    });
});
